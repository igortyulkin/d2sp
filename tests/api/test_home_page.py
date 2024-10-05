from fastapi.testclient import TestClient


def test_home(client: TestClient):
    assert client.get("/").status_code == 200
