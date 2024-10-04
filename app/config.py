import os

config = {
    "cost": os.environ['MODEL_PREDICTION_COST'],
    "metrics_file": "data/metrics.json",
    "model_file": "data/model.pkl",
    "model": {
        "predict_queue": "predict",
        "save_result_queue": "save"
    }
}
