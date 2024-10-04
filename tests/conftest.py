import os

import pytest
from fastapi.testclient import TestClient

from app.main import app
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

from database.config import get_settings


@pytest.fixture(name="client")
def client_fixture():
    client = TestClient(app)
    yield client


Base = declarative_base()
engine = create_engine(url=get_settings().DATABASE_URL_psycopg,
                       echo=bool(os.environ['DUMP_SQL']), pool_size=5, max_overflow=10)
Session = sessionmaker(bind=engine)


@pytest.fixture(name="session")
def db_session():
    Base.metadata.create_all(engine)
    session = Session()
    yield session
    session.rollback()
    session.close()
