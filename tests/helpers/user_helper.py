from sqlalchemy.orm import Session

from models.user import User

user_store: dict = {}


def create_user(session: Session, email, password: str = 'test', credit_count: int = 1000) -> User:
    if user_store.get(email):
        return user_store.get(email)
    user = User()
    user.email = email
    user.password = password
    user.first_name = 'test'
    user.last_name = 'test'
    user.credit_count = credit_count
    session.add(user)
    session.flush()
    session.commit()
    session.refresh(user)
    user_store['email'] = user

    return user
