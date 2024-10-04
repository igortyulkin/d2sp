import time
from fastapi.testclient import TestClient


def test_sign_up(client: TestClient):
    email = f"test_{str(time.time())}@mail.com"
    password = '123456'
    response = client.post("/user/signup", json={
        'email': email,
        'password': password,
        'first_name': "test first name",
        'last_name': "test last name"
    })
    assert response.status_code == 200
