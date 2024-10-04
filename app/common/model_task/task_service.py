from sqlalchemy.orm import Session
from typing import List, Union

from sqlalchemy import select

from models.enum.task_status import TaskStatus
from models.user import User
from database.database import session_factory
from models.model_task import ModelTask


def create_task(task: ModelTask, session: Session | None = None) -> ModelTask:
    if session is None:
        with session_factory() as session:
            session.add(task)
            session.flush()
            session.commit()
            session.refresh(task)

            return task
    session.add(task)
    session.flush()
    session.commit()
    session.refresh(task)


def get_task(task_id: int, session: Session | None = None) -> Union[ModelTask, None]:
    if session is None:
        with session_factory() as session:
            return session.get(ModelTask, task_id)
    return session.get(ModelTask, task_id)


def update_status(task_id: int, status: TaskStatus, quality: int | None = None, session: Session | None = None) -> None:
    if session is None:
        with session_factory() as session:
            session.query(ModelTask) \
                .filter_by(id=task_id) \
                .update({"status": status, "quality": quality})
            session.flush()
            session.commit()

    session.query(ModelTask) \
        .filter_by(id=task_id) \
        .update({"status": status, "quality": quality})
    session.flush()
    session.commit()


def get_user_tasks(user_id: int, session: Session | None = None) -> List[ModelTask]:
    if session is None:
        with session_factory() as session:
            return session.execute(select(ModelTask).filter_by(user=session.get(User, user_id))) \
                .scalars() \
                .all()
    return list(session.execute(select(ModelTask).filter_by(user=session.get(User, user_id)))
                .scalars()
                .all())
