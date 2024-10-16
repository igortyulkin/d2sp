from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from common.auth.AuthUser import AuthUser
from common.auth.authenticate import authenticate
from common.auth.hash_password import HashPassword
from common.auth.jwt_handler import create_access_token
from common.transaction.transaction_service import add_balance
from config import config
from database.database import get_session
from common.user.user_service import get_user_by_email, registration, get_user
from models.enum.transaction_type import TransactionType
from models.transaction import Transaction

from models.user import User
from schema.user_schema import SignUpRequest, GetUserResponse

user_route = APIRouter(tags=['User'])


@user_route.post('/signup')
def user_signup(data: SignUpRequest, session: Session = Depends(get_session)) -> dict:
    if get_user_by_email(data.email, session) is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User with same email already exists")
    user = registration(User(
        email=data.email,
        password=HashPassword().create_hash(password=data.password),
        first_name=data.first_name,
        last_name=data.last_name,
        middle_name=data.middle_name,
    ), session)

    t = Transaction()
    t.credit_count = config['default_balance']
    t.type = TransactionType.UP
    t.user = user
    add_balance(transaction=t, session=session)

    return {"message": "User created successfully!"}


@user_route.post('/signin')
def user_signin(data: OAuth2PasswordRequestForm = Depends(OAuth2PasswordRequestForm),
                session: Session = Depends(get_session)) -> dict:
    user: User | None = get_user_by_email(data.username, session)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if HashPassword().verify_hash(plain_password=data.password, hashed_password=user.password):
        return {
            "access_token": create_access_token(user),
        }

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")


@user_route.get('/', response_model=GetUserResponse)
def signup(auth_user: AuthUser = Depends(authenticate), session: Session = Depends(get_session)) -> GetUserResponse:
    user: User | None = get_user(auth_user.id, session)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found user")
    return GetUserResponse(id=user.id,
                           email=user.email,
                           credit_count=user.credit_count,
                           first_name=user.first_name,
                           last_name=user.last_name,
                           middle_name=user.middle_name,
                           created_at=user.created_at,
                           role=user.role
                           )
