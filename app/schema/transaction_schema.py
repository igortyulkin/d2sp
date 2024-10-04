import datetime
from pydantic import BaseModel, Field
from typing import List

from models.enum.transaction_type import TransactionType


class UserTransactionalItem(BaseModel):
    id: int = Field(None)
    credit_count: int = Field(0)
    type: TransactionType = Field(None)
    transaction_at: datetime.datetime = Field(None)


class GetUserTransactionalResponse(BaseModel):
    user_id: int = Field(default=None)
    items: List[UserTransactionalItem] = Field(default=[])


class UpBalanceRequest(BaseModel):
    credit_count: int = Field(0)


class UpBalanceResponse(BaseModel):
    user_id: int = Field(default=None)
    message: str = Field(default='Balance update successfully')
