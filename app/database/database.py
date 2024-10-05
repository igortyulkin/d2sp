# from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, async_session
# from sqlmodel.ext.asyncio.session import AsyncSession
import os

from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import create_engine
from sqlmodel import Session

from .config import get_settings

engine = create_engine(url=get_settings().DATABASE_URL_psycopg,
                       echo=bool(os.environ['DUMP_SQL']), pool_size=5, max_overflow=10)

session_factory = sessionmaker(engine)


def get_session() -> Session:
    with session_factory() as session:
        yield session


# async_engin = create_async_engine(url=get_settings().DATABASE_URL_asyncpg,
#                                   echo=True, pool_size=5, max_overflow=10)
# async_session_factory = sessionmaker(async_engin, class_=AsyncSession, expire_on_commit=False)
#
# async def get_async_session() -> AsyncSession:
#     async with async_session_factory() as async_session:
#         yield async_session


class Base(DeclarativeBase):
    pass
