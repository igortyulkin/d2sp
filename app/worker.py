import os
import json
import sys

import joblib
import pandas as pd

from common.model_task.task_service import update_status, get_task
from common.queue.message.PredictMessage import PredictMessage
from common.queue.message.SaveResultMessage import SaveResultMessage
from common.queue.queue import get_connection
from common.transaction.transaction_service import down_balance
from config import config
from database.database import session_factory
from models.enum.task_status import TaskStatus
from models.enum.transaction_type import TransactionType
from models.model_task import ModelTask
from models.transaction import Transaction

connection = get_connection()
channel = connection.channel()
session = session_factory()
model = None
if os.path.isfile(config['model_file']):
    model = joblib.load(config['model_file'])
if model is None:
    raise Exception('Prediction model no load')


def queue_config_resolver() -> tuple:
    if '--predict' in sys.argv:
        return config['model']['predict_queue'], predict_callback
    if '--save' in sys.argv:
        return config['model']['save_result_queue'], save_result_callback

    raise Exception("Empty queue name")


def predict_callback(ch, method, properties, body):
    message = PredictMessage(**json.loads(body))
    try:
        importance_df = pd.DataFrame({
            'Feature': list(dict(message.payload).keys()),
            'Importance': model.get_feature_importance()
        })
        importance_df = importance_df.sort_values(by='Importance', ascending=False)
        update_status(message.task_id, TaskStatus.PENDING, importance_list=list(importance_df['Feature']),
                      session=session)
        result = int(list(model.predict(pd.DataFrame([dict(message.payload)]))).pop())
    except Exception:
        update_status(message.task_id, TaskStatus.ERROR, session=session)
        pass
    channel.queue_declare(queue=config['model']['save_result_queue'])
    channel.basic_publish(exchange='', routing_key=config['model']['save_result_queue'],
                          body=json.dumps(SaveResultMessage(task_id=message.task_id, predict_result=result).__dict__)
                          )

    print(f"Prediction quality: '{result}' for task: {message.task_id}")


def save_result_callback(ch, method, properties, body):
    message = SaveResultMessage(**json.loads(body))
    task: ModelTask = get_task(message.task_id, session)
    update_status(message.task_id, TaskStatus.SUCCESS, quality=message.predict_result, session=session)
    down_balance(Transaction(
        credit_count=config['cost'],
        type=TransactionType.DOWN,
        transaction_by=task.user.id,
    ), session)

    print(f"Result for task: {message.task_id} saved:")


# Start consuming
queue, callback = queue_config_resolver()
channel.queue_declare(queue=queue)
channel.basic_consume(queue=queue, on_message_callback=callback, auto_ack=True)
print(f'Waiting messages in queue: {queue}. To exit, press Ctrl+C')
channel.start_consuming()
connection.close()
# End consuming
