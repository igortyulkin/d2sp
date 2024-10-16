from typing import List

from pydantic import BaseModel, Field

from common.model_task.recommendation import calculate_rec_list
from models.enum.task_status import TaskStatus
from models.model_task import ModelTask


class PredictItem(BaseModel):
    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float
    pH: float
    sulphates: float
    alcohol: float


class CreateTaskRequest(BaseModel):
    payload: dict


class PredictResponse(BaseModel):
    predicted_quality: int = Field(None)


class CreateTaskResponse(BaseModel):
    task_id: int = Field(None)


class GetTaskResponse(BaseModel):
    task_id: int = Field(None)
    status: TaskStatus = Field(TaskStatus.NEW)
    quality: int = Field(None)


class GetTaskItem(BaseModel):
    id: int = Field(None)
    status: TaskStatus = Field(TaskStatus.NEW)
    quality: int = Field(None)
    payload: dict = Field(None)
    recommendations: list = Field(None)


class GetUserTasksResponse(BaseModel):
    items: List[GetTaskItem] = Field(default=[])


def create_get_task_item(task: ModelTask) -> GetTaskItem:
    item = GetTaskItem()
    item.id = task.id
    item.status = task.status
    item.quality = task.quality
    item.payload = task.payload
    item.recommendations = calculate_rec_list(task)

    return item
