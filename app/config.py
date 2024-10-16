import os

config = {
    "cost": os.environ['MODEL_PREDICTION_COST'],
    "model_file": "data/model.pkl",
    "model": {
        "predict_queue": "predict",
        "save_result_queue": "save"
    },
    "default_balance": 100,
    "count_recommendation_features": 5
}
