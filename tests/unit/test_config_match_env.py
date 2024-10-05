import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env


def test_config_match_env():
    assert int(os.environ["MODEL_PREDICTION_COST"]) == 10
