## Data science salary predictor(DS2P)
### Сервис предсказания заработной платы
### О нас
Мы помогаем начинающим специалистам в Data Science узнать, какую заработную плату можно ожидать на старте карьеры.

### Как это работает?
1. Введите данные: Уровень образования, опыт, навыки.
2. Получите прогноз: Узнайте свою потенциальную зарплату.
### Почему мы?
- Точные прогнозы
- Простота использования
- Актуальные данные

----
##For local development
### Install dependencies
```
python -m venv venv
source venv/bin/activate
pip install -Ur requirements.txt
export PYTHONPATH=$PYTHONPATH:$PWD:$PWD/app:$PWD/tests
```

### Build container for local dev
```
cp env_dist .env
cp frontend/env_dist frontend/.env
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
if need configure `tests/pytest.ini` and run
```
bin/test.sh
```
### Check lint
```
bin/lint.sh
```

