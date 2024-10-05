#!/usr/bin/env bash

export PYTHONPATH=$PYTHONPATH:$PWD:$PWD/app:$PWD/tests
pip install -Ur app/requirements.txt
PYTHONPATH=$PYTHONPATH:$PWD:$PWD/app:$PWD/tests pytest tests --cov=. -s -v --junitxml=junit.xml