from sqlalchemy.orm import Session

from helpers.user_helper import create_user

from models.enum.transaction_type import TransactionType
from models.transaction import Transaction
from app.common.transaction.transaction_service import down_balance


def test_down_balance(session: Session):
    u = create_user(session, 'down_balance', credit_count=2000)
    t = Transaction()
    t.credit_count = 1000
    t.type = TransactionType.DOWN
    t.transaction_by = u.id
    down_balance(t, session)
    print(u.credit_count)
    assert 1000 == int(u.credit_count)
