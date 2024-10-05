from sqlalchemy.orm import Session

from helpers.user_helper import create_user

from models.enum.transaction_type import TransactionType
from models.transaction import Transaction
from app.common.transaction.transaction_service import add_balance


def test_add_balance(session: Session):
    u = create_user(session, 'add_balance', credit_count=100)
    t = Transaction()
    t.credit_count = 100
    t.type = TransactionType.UP
    t.user = u
    add_balance(t, session)
    assert 200 == int(u.credit_count)
