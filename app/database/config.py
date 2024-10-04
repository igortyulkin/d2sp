import os
from typing import Optional

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    DB_HOST: Optional[str] = os.environ['POSTGRES_HOST']
    DB_PORT: Optional[int] = os.environ['POSTGRES_PORT']
    DB_USER: Optional[str] = os.environ['POSTGRES_USER']
    DB_PASS: Optional[str] = os.environ['POSTGRES_PASSWORD']
    DB_NAME: Optional[str] = os.environ['POSTGRES_DB']

    @property
    def DATABASE_URL_asyncpg(self):
        return f'postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'

    @property
    def DATABASE_URL_psycopg(self):
        return f'postgresql+psycopg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'


@lru_cache()
def get_settings() -> Settings:
    return Settings()
