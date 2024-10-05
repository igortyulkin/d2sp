from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from models.user import User
from common.user.user_service import get_user


def check_user_exists(user_id: int, session: Session) -> None:
    user: User | None = get_user(user_id, session)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found user")


def check_allow_credits(user_id: int, need_credit_count: int, session: Session) -> None:
    user: User | None = get_user(user_id, session)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found user for check balance")
    if int(user.credit_count) < int(need_credit_count):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Too low balance")
