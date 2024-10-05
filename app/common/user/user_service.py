from typing import Union

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session

from models.user import User
from database.database import session_factory


def registration(user: User, session: Session | None = None) -> User:
    if session is None:
        with session_factory() as session:
            session.add(user)
            session.flush()
            session.commit()
            session.refresh(user)

            return user
    else:
        session.add(user)
        session.flush()
        session.commit()
        session.refresh(user)
        return user


def get_user_by_email(email: str, session: Session | None = None) -> Union[User, None]:
    if session is None:
        with session_factory() as session:
            try:
                return session.execute(select(User).filter_by(email=email)) \
                    .scalars() \
                    .one()
            except NoResultFound:
                return None
    else:
        try:
            return session.execute(select(User).filter_by(email=email)) \
                .scalars() \
                .one()
        except NoResultFound:
            return None


def get_user(user_id: int, session: Session | None = None) -> Union[User, None]:
    if session is None:
        with session_factory() as session:
            return session.get(User, user_id)
    else:
        return session.get(User, user_id)
