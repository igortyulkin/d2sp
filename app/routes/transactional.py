from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from common.auth.AuthUser import AuthUser
from common.auth.authenticate import authenticate
from database.database import get_session
from routes.common import check_user_exists
from common.user.user_service import get_user
from common.transaction.transaction_service import transaction_history, add_balance
from models.enum.transaction_type import TransactionType
from models.transaction import Transaction
from schema.transaction_schema import UserTransactionalItem, GetUserTransactionalResponse, UpBalanceRequest, \
    UpBalanceResponse

transactional_route = APIRouter(tags=['transactional'])


def create_user_transaction_item(t: Transaction) -> UserTransactionalItem:
    item = UserTransactionalItem()
    item.id = t.id
    item.type = t.type
    item.credit_count = t.credit_count
    item.transaction_at = t.transaction_at

    return item


@transactional_route.get('/', response_model=GetUserTransactionalResponse)
def get_user_transactional(auth_user: AuthUser = Depends(authenticate),
                           session: Session = Depends(get_session)) -> GetUserTransactionalResponse:
    check_user_exists(auth_user.id, session)
    response = GetUserTransactionalResponse()
    response.user_id = auth_user.id
    response.items = list(map(create_user_transaction_item, transaction_history(auth_user.id, session)))

    return response


def create_transaction(user_id: int, request: UpBalanceRequest, session: Session | None) -> Transaction:
    t = Transaction()
    t.credit_count = request.credit_count
    t.type = TransactionType.UP
    t.user = get_user(user_id, session)

    return t


@transactional_route.post('/up_balance', response_model=UpBalanceResponse)
def up_balance(request: UpBalanceRequest,
               auth_user: AuthUser = Depends(authenticate),
               session: Session = Depends(get_session)) -> UpBalanceResponse:
    print(auth_user.id)
    check_user_exists(auth_user.id, session)
    add_balance(create_transaction(user_id=auth_user.id, request=request, session=session), session)
    response = UpBalanceResponse()
    response.user_id = auth_user.id

    return response
