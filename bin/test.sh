#!/usr/bin/env bash

export PYTHONPATH=$PYTHONPATH:$PWD:$PWD/app:$PWD/tests
pip install -Ur app/requirements.txt
pytest tests --cov=. -s -v --junitxml=junit.xml