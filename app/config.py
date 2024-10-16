import os

config = {
    "cost": os.environ['MODEL_PREDICTION_COST'],
    "model_file": "data/model.pkl",
    "model": {
        "predict_queue": "predict",
        "save_result_queue": "save"
    },
    "count_recommendation_features": 5
}
