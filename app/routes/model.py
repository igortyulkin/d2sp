import json
import os

import joblib
from fastapi import HTTPException, APIRouter, Depends, status
from pathlib import Path

from common.auth.authenticate import authenticate
from common.auth.AuthUser import AuthUser
from common.queue.message.PredictMessage import PredictMessage
from common.queue.queue import get_connection
from config import config
from database.database import get_session

from common.model_task.task_service import create_task, get_task, get_user_tasks
from models.enum.task_status import TaskStatus
from models.model_task import ModelTask
from routes.common import check_user_exists, check_allow_credits
from schema.model_schema import CreateTaskRequest, CreateTaskResponse, GetTaskResponse, GetUserTasksResponse

model_route = APIRouter(tags=['model'])
path_to_file = Path(__file__).parent.parent / config['model_file']
model = None
if os.path.isfile(path_to_file):
    model = joblib.load(path_to_file)
is_ready = model is not None


def create_model_task(auth_user: AuthUser, payload: dict) -> ModelTask:
    return ModelTask(cost=config['cost'],
                     status=TaskStatus.NEW,
                     predicted_by=auth_user.id,
                     payload=payload)


@model_route.post("/task/create", response_model=CreateTaskResponse)
def task_create(request: CreateTaskRequest,
                auth_user: AuthUser = Depends(authenticate),
                session=Depends(get_session)) -> CreateTaskResponse:
    check_user_exists(auth_user.id, session)
    check_allow_credits(auth_user.id, config['cost'], session)

    task = create_model_task(auth_user, dict(request.payload))
    create_task(task)

    queue_connection = get_connection()
    channel = queue_connection.channel()
    channel.queue_declare(queue=config['model']['predict_queue'])
    channel.basic_publish(exchange='', routing_key=config['model']['predict_queue'],
                          body=json.dumps(PredictMessage(task_id=task.id, payload=dict(request.payload)).__dict__)
                          )

    return CreateTaskResponse(task_id=task.id)


@model_route.get("/task/{id}", response_model=GetTaskResponse)
def task_get(task_id: int,
             auth_user: AuthUser = Depends(authenticate),
             session=Depends(get_session)) -> GetTaskResponse:
    task: ModelTask | None = get_task(task_id, session)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found task")
    if task.user.id != auth_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    return GetTaskResponse(task_id=task_id, status=task.status, quality=task.quality)


@model_route.get("/tasks", response_model=GetUserTasksResponse)
def task_get_list(auth_user: AuthUser = Depends(authenticate),
                  session=Depends(get_session)) -> GetUserTasksResponse:
    response = GetUserTasksResponse()
    response.items = list(get_user_tasks(auth_user.id, session))

    return response
