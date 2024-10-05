from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from common.auth.AuthUser import AuthUser
from common.auth.jwt_handler import verify_access_token


def authenticate(token: str = Depends(OAuth2PasswordBearer(tokenUrl="/user/signin"))) -> AuthUser:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Sign in for access"
        )
    decoded_token = verify_access_token(token)

    return AuthUser(
        id=decoded_token['id'],
        email=decoded_token["email"],
        role=decoded_token['role']
    )
