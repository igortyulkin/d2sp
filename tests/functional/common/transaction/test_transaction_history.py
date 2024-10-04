from sqlalchemy.orm import Session

from helpers.transaction_helper import create_transaction
from helpers.user_helper import create_user

from app.common.transaction.transaction_service import transaction_history


def test_transaction_history(session: Session):
    u = create_user(session, 'history1', credit_count=2000)
    create_transaction(u=u, credit_count=1000, session=session)
    create_transaction(u=u, credit_count=2000, session=session)
    create_transaction(u=u, credit_count=3000, session=session)

    assert len(transaction_history(u.id)) == 3
