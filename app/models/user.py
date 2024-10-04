from sqlalchemy import Column, Integer, String, DateTime, func, Enum
from database.database import Base
from models.enum.user_role import UserRole


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    middle_name = Column(String, default=None)
    credit_count = Column(Integer, default=0)
    created_at = Column(DateTime, nullable=False, default=func.now())
    role = Column(Enum(UserRole, name='u_role'), nullable=False, default=UserRole.ROLE_USER)
