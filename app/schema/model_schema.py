from typing import List

from pydantic import BaseModel, Field

from models.enum.task_status import TaskStatus


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


class GetUserTasksResponse(BaseModel):
    items: List[GetTaskItem] = Field(default=[])
