# Лабораторная работа 3

## Вариант `331501`

<img alt="anime" src="./.resources/anime.gif" height="300">

> There are only two hard problems in two-phase distributed transactions: \
> 2\. Exactly-once delivery \
> 1\. Guaranteed order of messages \
> 2\. Exactly-once delivery

[![Made with: Spring](https://img.shields.io/badge/Spring-white?style=for-the-badge&logo=spring&logoColor=6DB33F)](https://spring.io/)
[![Made with: Spring Boot](https://img.shields.io/badge/Spring%20Boot-white?style=for-the-badge&logo=springboot&logoColor=6DB33F)](https://spring.io/projects/spring-boot)
[![Made with: Spring Security](https://img.shields.io/badge/Spring%20Security-white?style=for-the-badge&logo=springsecurity&logoColor=6DB33F)](https://spring.io/projects/spring-security) \
[![Made with: Java](https://img.shields.io/badge/Java-176579?style=for-the-badge&logo=coffeescript&logoColor=E78A2A)](https://www.java.com)
[![Made with: MinIO](https://img.shields.io/badge/MinIO-C72E49?style=for-the-badge&logo=minio&logoColor=white)](https://min.io/)
[![Made with: Flyway](https://img.shields.io/badge/Flyway-CC0000?style=for-the-badge&logo=flyway&logoColor=white)](https://www.red-gate.com/products/flyway/) \
[![Made with: PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Made with: Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) \
[![Made with: React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=23272f)](https://react.dev/)
[![Made with: Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![Made with: MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Made with: JSS](https://img.shields.io/badge/JSS-F7DF1E?style=for-the-badge&logo=jss&logoColor=black)](https://cssinjs.org/?v=v10.10.1)

|.pdf|.docx|
|-|-|
| [report](./docs/report.pdf) | [report](./docs/report.docx) |

---

### Команда

- **Группа:** `P3315`
- **Студенты:**
  - [@maxbarsukov](https://github.com/maxbarsukov): Барсуков Максим Андреевич `367081`;
  - [@pmpknu](https://github.com/pmpknu): Горляков Даниил Петрович `367165`.


### Задание

* [Текст задания](./docs/task.png) с [_se.ifmo.ru_](https://se.ifmo.ru/courses/is).

Доработать ИС из [`ЛР2`](https://github.com/maxbarsukov-itmo/information-systems-labs/tree/lab-2) следующим образом:

- Реализовать сохранение загруженных на сервер файлов, используемых для импорта данных, в файловом хранилище `MinIO` (можно взять любое другое *S3-совместимое хранилище*). Поднять и настроить `MinIO` требуется самостоятельно. Загруженные файлы должны быть доступны для скачивания из таблицы с логом импорта.
- Сохранение загруженных файлов в файловом хранилище должно быть реализовано **транзакционно по отношению к операциям**, реализующим непосредственную вставку объектов в БД при импорте.
- Для реализации распределенной транзакции из пункта 2 разрешается использовать любые инструменты. Рекомендуется решать задачу при помощи собственной реализации двух фазного коммита.
- Необходимо на защите быть готовым продемонстрировать корректность реализованной распределенной транзакции в следующих условиях:
  - **отказ файлового хранилища** (БД продолжает работать)
  - **отказ БД** (файловое хранилище продолжает работать)
  - **ошибка в бизнес-логике сервера** (работают и БД, и файловое хранилище, однако в коде сервера вылетает `RuntimeException` между запросами в разные источники данных)
- Необходимо на защите быть готовым продемонстрировать корректность работы распределенной транзакции в условиях параллельных запросов от нескольких пользователей (реализованный в [`ЛР2`](https://github.com/maxbarsukov-itmo/information-systems-labs/tree/lab-2) сценарий для `Apache JMeter`, тестирующий функцию импорта, должен продолжать корректно отрабатывать).

### Содержание отчёта:

1. Текст задания.
2. UML-диаграммы классов и пакетов разработанного приложения.
3. Исходный код системы или ссылка на репозиторий с исходным кодом.
4. Выводы по работе.

### Вопросы к защите лабораторной работы:

1. `Java Transaction API`. Основные принципы и программные интерфейсы. Работа с `JTA` в приложениях на базе `Spring`.
2. Двухфазная фиксация в распределенных транзакциях (**two-phase commit protocol**).
3. **Распределенные транзакции**, спецификация XA. Реализация в приложениях на базе `Jakarta EE` и `Spring`.
4. **Менеджеры транзакций**. Использование менеджера транзакций в приложениях на базе `Spring`.

### Как запустить?

Экспорт переменных окружения:

    export $(cat .env | xargs)

База данных и MinIO:

    docker compose up

Запуск **back-end**:

    ./gradlew bootRun

Запуск **front-end**:

    cd frontend
    yarn install
    yarn start

## Лицензия <a name="license"></a>

Проект доступен с открытым исходным кодом на условиях [Лицензии MIT](https://opensource.org/licenses/MIT). \
*Авторские права 2024 Max Barsukov*

**Поставьте звезду :star:, если вы нашли этот проект полезным.**
