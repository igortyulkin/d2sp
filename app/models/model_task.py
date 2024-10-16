from sqlalchemy import Column, Integer, DateTime, func, Enum, ForeignKey, JSON, ARRAY, String
from sqlalchemy.orm import relationship

from database.database import Base
from models.enum.task_status import TaskStatus
from models.user import User


class ModelTask(Base):
    __tablename__ = 'model_task'
    id = Column(Integer, primary_key=True)
    status = Column(Enum(TaskStatus, name='task_status'), nullable=False)
    cost = Column(Integer, nullable=False)
    predicted_at = Column(DateTime, nullable=False, default=func.now())
    predicted_by = Column(Integer, ForeignKey(User.id), name="user_id", nullable=False,
                          default=func.now())
    user = relationship(User)
    quality = Column(Integer, nullable=True)
    payload = Column(JSON, nullable=True)
    importance_list = Column(ARRAY(String), nullable=True)
