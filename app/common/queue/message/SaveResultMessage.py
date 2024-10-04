class SaveResultMessage:
    task_id: int
    predict_result: int

    def __init__(self, task_id: int, predict_result: int) -> None:
        self.task_id = task_id
        self.predict_result = predict_result
