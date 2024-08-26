**1\. Бизнес-анализ (Business Understanding)**

В первую очередь необходимо определиться с целями и скоупом проекта.

Для этого нужно найти ответы на следующие вопросы:

- _Организационная структура: кто участвует в проекте со стороны заказчика сервиса, кто будет основным пользователем?_
  + Рекрутинговый отдел.

- _Собираем контакты, создаем рабочие чаты._
  + Телеграм канал исполнителя: @igortyulkin

- _Какова бизнес-цель проекта? Например, уменьшение оттока клиентов._
  + Построить сервис, который по навыкам кандидата позволяет определить заработную плану соответствующую рынку.

- Существуют ли какие-то уже разработанные решения? Если существуют, то какие и чем именно текущее решение не устраивает?
  + Нет

**1.1 Текущая ситуация (Assessing current solution)**

Оцениваем, хватает ли ресурсов для проекта.

- Есть ли доступное железо или его необходимо закупать?
Для старта проекта и развертывания в production среде необходимо:
  + 2 VDI 1CPU, 4RAM, 100GB HDD для работы backend & frontend
  + 2 VDI 1CP, 4RAM, 200GB для Базы данных(master & slave) приложения.
  + 1 VDI для обучения модели окружения 2CPU, 4RAM, 300GB 
  + 1 VDI для тестового окружения 1CPU, 4RAM, 100GB
  + 1 VDI для тестового окружения Базы данных, 4RAM, 100GB приложения.

- Где и как хранятся данные, будет ли предоставлен доступ в эти системы, нужно ли дополнительно докупать/собирать
- внешние данные?
  + Датасеты для обучения хранятся в S3 или на VDI для обучения модели.

- Сможет ли заказчик выделить своих экспертов для консультаций на данный проект?
  + Да. Контакты @Марк Паненко


Возможные риски:
  - Не уложиться в сроки.
    + _При необходимости привлечь дополнительных экспертов._
  - Малое количество или плохое качество данных, которые не позволят получить эффективную модель. 
    + _Брать данные из разных источников_
  - Данные качественные, но закономерности в принципе отсутствуют и, как следствие, полученные результаты не интересны заказчику. 
    + _Пересмотреть решаемую задачу_

**1.2 Решаемые задачи с точки зрения аналитики (Data Mining goals)**

Выполняем постановку в технических терминах. Для этого нужно ответить на следующие вопросы:

- Какую метрику мы будем использовать для оценки результата моделирования (а выбрать есть из чего: Accuracy, RMSE,
- AUC, Precision, Recall, F-мера, R2, Lift, Logloss и т.д.)?
  + _Оценивать будем качество модели в RMSE. Более подробное определим после анализа данных_
- Каков критерий успешности модели (например, считаем AUC равный 0.65 — минимальным порогом, 0.75 —
- оптимальным)?
 + _Более подробное определим после анализа данных_ 
- Если объективный критерий качества использовать не будем, то как будут оцениваться результаты?
 + _Прогнозируемое значение будем брать как среднее по зарплатам в текущем регионе_

**1.3 План проекта (Project Plan)**

Как только получены ответы на все основные вопросы и ясна цель проекта, время составить план проекта. План должен
содержать оценку всех шести фаз внедрения.

#### Анализ данных
 + Анализ данных. Необходимо исследовать рынок вакансий Data Science и проанализировать какие данные нам нужны для обучения модели.
 + Сбор данных. Из разных источников: HeadHunter, ODS, SuperJob попытаться выгрузить данные, определить наиболее полные и доступные источники данных для дальнейшей работы.

#### Подготовка данных

 + Нормализация данных. На основе полученных данных сделать их нормализацию, провести EDA, исключить "грязные" данные, поработать с выбросами.
 + Конструирование признаков. Выделить наиболее информативные признаки, убрать линейные признаки, если данных не достаточно, то построить дополнительные признаки на основе текущих. 

#### Моделирование
 + Выбор алгоритма. Подобрать необходимую модель для обучения.
 + Планирование тестирования. Разделить сформированный на предыдущих этапах датасет на тренировочную и валидационную части.
 + Обучение модели. Провести обучение модели на выбранному алгоритме в 

#### Оценка решения
 + Оценка результатов. Согласно выбранной метрике оценить качество модели.

#### Упаковка модели в сервис
 + Упаковка модели в сервис. Добавить модель в сервис для отправки запросов к ней через API и веб-интерфейс.
 + При необходимости и согласовании с заказчиком:
   + привлечь дополнительные ресурсы для реализации других точек доступа к модели(Tbot/Очереди/CLI)
   + настроить мониторинг работы сервиса 
