from sqlalchemy.orm import Session

from models.enum.transaction_type import TransactionType
from models.transaction import Transaction
from models.user import User


def create_transaction(session: Session, u: User, t_type: TransactionType = TransactionType.UP,
                credit_count: int = 1000) -> Transaction:
    t = Transaction()
    t.credit_count = credit_count
    t.type = t_type
    t.transaction_by = u.id
    t.user = u
    session.add(t)
    session.flush()
    session.commit()
    session.refresh(t)

    return t
