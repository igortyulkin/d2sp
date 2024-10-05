from typing import List

from sqlalchemy import select
from sqlalchemy.orm import Session

from models.transaction import Transaction
from models.user import User
from database.database import session_factory


def add_balance(transaction: Transaction, session: Session | None = None) -> None:
    if session is None:
        with session_factory() as session:
            session.add(transaction)
            user: User = session.get(User, transaction.user.id)
            user.credit_count = user.credit_count + transaction.credit_count
            session.flush()
            session.commit()
            session.refresh(user)
    else:
        session.add(transaction)
        user = session.get(User, transaction.user.id)
        user.credit_count = user.credit_count + transaction.credit_count
        session.flush()
        session.commit()
        session.refresh(user)


def down_balance(transaction: Transaction, session: Session) -> None:
    session.add(transaction)
    user = session.get(User, transaction.transaction_by)
    user.credit_count = int(user.credit_count) - int(transaction.credit_count)
    session.flush()
    session.commit()
    session.refresh(user)


def transaction_history(user_id: int, session: Session | None = None) -> List[Transaction]:
    if session is None:
        with session_factory() as session:
            return session.execute(select(Transaction).filter_by(user=session.get(User, user_id))) \
                .scalars() \
                .all()
    else:
        return list(session.execute(select(Transaction).filter_by(user=session.get(User, user_id)))
                    .scalars()
                    .all())
