import json
from time import sleep

import requests
from requests import HTTPError, Response
from loguru import logger


def get_vacancy_info(url):
    response = requests.get(url)
    response.raise_for_status()

    return response.json()


def get_vacancies(vacancy, page: int = 1, per_page: int = 100):
    url = 'https://api.hh.ru/vacancies'
    params = {
        'text': f"{vacancy}",
        'per_page': per_page,
        'page': page
    }
    headers = {}

    response = requests.get(url, params=params, headers=headers)
    try:
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        response: Response = e.response
        if response.status_code == 400:
            return []
        raise e


def vacancy_load(titles: list, count=10, per_page=100, sleep_sec=0.5):
    ids = set()
    data = []
    for title in titles:
        logger.info(f"Run load vacancy: {title}")
        for i in range(count):
            i_data: dict = get_vacancies(title, i + 1, per_page)
            if len(i_data) == 0:
                break
            items = i_data['items']
            if len(items) == 0:
                logger.info('Empty list. break from load')
                break
            for vacancy in items:
                if vacancy['id'] not in ids:
                    logger.info(f"Load addition info for id {vacancy['id']}")
                    vacancy_info = get_vacancy_info(vacancy['url'])
                    del vacancy_info['branded_description']
                    vacancy['addition_info'] = vacancy_info

                    data.append(vacancy)
                    ids.add(vacancy['id'])
                    logger.info(f"Loaded count: {len(data)}")
                    sleep(sleep_sec)

        with open('hw/data_search/hh_ru2.json', 'w') as f:
            f.write(json.dumps(data, sort_keys=True, indent=4, ensure_ascii=False))


with open('etc/keywords.json') as f:
    keywords = json.load(f)['keywords']
vacancy_load(keywords, count=20, per_page=100, sleep_sec=1)
