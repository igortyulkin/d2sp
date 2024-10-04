import datetime

from pydantic import BaseModel, Field


class SignInRequest(BaseModel):
    email: str
    password: str


class SignUpRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    middle_name: str | None = Field(None)


class GetUserResponse(BaseModel):
    id: int = Field(None)
    email: str = Field('')
    credit_count: int = Field(0)
    first_name: str = Field(None)
    last_name: str = Field(None)
    middle_name: str | None = Field(None)
    created_at: datetime.datetime = Field(None)
    role: str = Field(None)
