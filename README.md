# Лабораторная работа 2

## Вариант `331501`

<img alt="anime" src="./.resources/anime.gif" height="300">

> Бешеной собаке семь вёрст не крюк. \
> — русская народная пословица

[![Made with: Spring](https://img.shields.io/badge/Spring-white?style=for-the-badge&logo=spring&logoColor=6DB33F)](https://spring.io/)
[![Made with: Spring Boot](https://img.shields.io/badge/Spring%20Boot-white?style=for-the-badge&logo=springboot&logoColor=6DB33F)](https://spring.io/projects/spring-boot)
[![Made with: Spring Security](https://img.shields.io/badge/Spring%20Security-white?style=for-the-badge&logo=springsecurity&logoColor=6DB33F)](https://spring.io/projects/spring-security) \
[![Made with: Java](https://img.shields.io/badge/Java-176579?style=for-the-badge&logo=coffeescript&logoColor=E78A2A)](https://www.java.com)
[![Made with: Flyway](https://img.shields.io/badge/Flyway-CC0000?style=for-the-badge&logo=flyway&logoColor=white)](https://www.red-gate.com/products/flyway/)
[![Made with: PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Made with: Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) \
[![Made with: React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=23272f)](https://react.dev/)
[![Made with: Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://react.dev/)
[![Made with: MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://react.dev/)
[![Made with: JSS](https://img.shields.io/badge/JSS-F7DF1E?style=for-the-badge&logo=jss&logoColor=black)](https://react.dev/)

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

* [Текст задания](./docs/task.jpeg) с [_se.ifmo.ru_](https://se.ifmo.ru/courses/is).

Доработать ИС из `ЛР1` следующим образом:

- Добавить в систему возможность **массового добавления объектов** при помощи импорта файла. Формат для импорта необходимо согласовать с преподавателем. Импортируемый файл должен загружаться на сервер через интерфейс разработанного веб-приложения.
  - При реализации логики импорта объектов необходимо **реализовать транзакцию** таким образом, чтобы _в случае возникновения ошибок при импорте, не был создан ни один объект_.
  - При импорте должна быть реализована **проверка пользовательского ввода** в соответствии с ограничениями предметной области из `ЛР1`.
  - При наличии **вложенных объектов** в основной объект из `ЛР1` необходимо задавать значения полей вложенных объектов в той же записи, что и основной объект.
- Необходимо добавить в систему интерфейс для отображения истории импорта (обычный пользователь видит только операции импорта, запущенные им, администратор - все операции).
  - В истории должны отображаться `id` операции, статус ее завершения, пользователь, который ее запустил, число добавленных объектов в операции (только для успешно завершенных).
- Согласовать с преподавателем и добавить в модель из `ЛР1` **новые ограничения уникальности**, проверяемые на программном уровне (эти новые ограничения должны быть реализованы в рамках бизнес-логики приложения и **не** должны быть отображены/реализованы в БД).
- Реализовать сценарий с использованием `Apache JMeter`, имитирующий **одновременную работу нескольких пользователей с ИС**, и проверить **корректность изоляции транзакций**, используемых в ЛР. По итогам исследования поведения системы при ее одновременном использовании несколькими пользователями **изменить уровень изоляции транзакций** там, где это требуется. Обосновать изменения.
  1. Реализованный сценарий должен покрывать создание, редактирование, удаление и импорт объектов.
  2. Реализованный сценарий должен проверять корректность поведения системы при попытке нескольких пользователей обновить и\или удалить один и тот же объект (например, двух администраторов).
  3. Реализованный сценарий должен проверять корректность соблюдения системой ограничений уникальности предметной области при одновременной попытке нескольких пользователей создать объект с одним и тем же уникальным значением.

### Содержание отчёта:

1. Текст задания.
2. UML-диаграммы классов и пакетов разработанного приложения.
3. Исходный код системы или ссылка на репозиторий с исходным кодом.
4. Выводы по работе.

### Вопросы к защите лабораторной работы:

1. Понятие **бизнес-логики** в программных системах. Уровень бизнес-логики в многоуровневой архитектуре программных систем.
2. `Jakarta Enterprise Beans` (`EJB`). Виды бинов и их назначение
3. `EJB Session beans`. Жизненный цикл.
4. Понятие **транзакции**. Транзакции в БД. **ACID**
5. Виды конфликтов при многопользовательской работе с данными. **Уровни изоляции транзакций**.
6. Особенности реализации транзакций на уровне бизнес-логики, отличия от транзакций на уровне БД.
7. `Java Transaction API`. Основные принципы и программные интерфейсы.
8. Реализация управления транзакциями в `Jakarta EE`. Декларативное и программное управление транзакциями.
9. Реализация управления транзакциями в `Spring`. Декларативное и программное управление транзакциями в `Spring`. Аннотация `@Transactional`.

### Как запустить?

Экспорт переменных окружения:

    export $(cat .env | xargs)

База данных:

    docker compose up

Запуск **back-end**:

    ./gradlew bootRun

Запуск **front-end**:

    cd frontend
    npm run dev


## Лицензия <a name="license"></a>

Проект доступен с открытым исходным кодом на условиях [Лицензии MIT](https://opensource.org/licenses/MIT). \
*Авторские права 2024 Max Barsukov*

**Поставьте звезду :star:, если вы нашли этот проект полезным.**
