import os
import time
from datetime import datetime
from fastapi import HTTPException, status
from jose import jwt, JWTError
from models.user import User

AUTH_SECRET_KEY = os.environ['AUTH_SECRET_KEY']


def create_access_token(user: User) -> str:
    payload = {
        "id": user.id,
        "email": user.email,
        "role": str(user.role),
        "expires": time.time() + 3600
    }
    token = jwt.encode(payload, AUTH_SECRET_KEY, algorithm="HS256")
    return token


def verify_access_token(token: str) -> dict:
    try:
        data = jwt.decode(token, AUTH_SECRET_KEY, algorithms=["HS256"])
        expire = data.get("expires")
        if expire is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No access token supplied"
            )
        if datetime.utcnow() > datetime.utcfromtimestamp(expire):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token expired!"
            )
        return data
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
