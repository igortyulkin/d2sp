from config import config
from models.model_task import ModelTask


def calculate_rec_list(task: ModelTask) -> list:
    if task.importance_list is None or len(task.importance_list) == 0:
        return []
    if task.payload is None:
        return []

    result = []
    for i in range(len(task.importance_list)):
        feature = task.importance_list[i]
        if 0 == task.payload.get(feature):
            result.append(feature)
        if config['count_recommendation_features'] == len(result):
            break

    return result
