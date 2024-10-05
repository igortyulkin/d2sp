class PredictMessage:
    task_id: int
    payload: dict

    def __init__(self, task_id: int, payload: dict) -> None:
        self.task_id = task_id
        self.payload = payload
