from sqlalchemy import Column, Integer, DateTime, func, Enum, ForeignKey
from sqlalchemy.orm import relationship

from database.database import Base
from models.enum.transaction_type import TransactionType
from models.user import User


class Transaction(Base):
    __tablename__ = 'transaction'
    id = Column(Integer, primary_key=True)
    credit_count = Column(Integer, nullable=False)
    type = Column(Enum(TransactionType, nullable=False, name='t_type'))
    transaction_at = Column(DateTime, nullable=False, default=func.now())
    transaction_by = Column(Integer, ForeignKey(User.id), name="user_id", nullable=False,
                            default=func.now())
    user = relationship(User)
