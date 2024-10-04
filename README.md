Data science salary predictor(DS2P)
-- 
##For local development
### Install dependencies
```
python -m venv venv
source venv/bin/activate
pip install -Ur requirements.txt
export PYTHONPATH=$PYTHONPATH:$PWD:$PWD/app:$PWD/tests
```
### Load data for learning
```
@todo
```

### Build container for local dev
```
cp env_dist .env
cp env_dist .env.test
1. docker-compose build
2. docker-compose run frontend npm i --loglevel=error
4. docker-compose up -d
3  docker-compose run app alembic upgrade head
5. check api on http://localhost, docs on http://localhost/docs, wait ~10sec and check UI on http://localhost:3000
```
### Check schema diff
```
docker-compose run app alembic revision --autogenerate
```
### Run tests
```
PYTHONPATH=$PYTHONPATH:$PWD:$PWD/app:$PWD/tests python -m pytest tests/
```
### Check lint
```
flake8 src -v
```

