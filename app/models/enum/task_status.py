import enum


class TaskStatus(enum.Enum):
    NEW = 'new'
    PENDING = 'pending'
    SUCCESS = 'success'
    ERROR = 'error'
