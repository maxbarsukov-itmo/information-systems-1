BEGIN;

-- Вспомогательный тип для типов драконов (enum DragonType)
CREATE TYPE dragon_type AS ENUM ('WATER', 'UNDERGROUND', 'AIR', 'FIRE');

-- Вспомогательный тип для цветов (enum Color)
CREATE TYPE color AS ENUM ('GREEN', 'RED', 'BLACK', 'YELLOW', 'BROWN');

-- Вспомогательный тип для ролей пользователей (enum Role)
CREATE TYPE user_role AS ENUM ('ROLE_USER', 'ROLE_ADMIN');

-- Таблица пользователей системы
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                                      -- Уникальный идентификатор пользователя
  username VARCHAR(255) NOT NULL UNIQUE,                      -- Логин пользователя (уникальный)
  password_hash VARCHAR(128) NOT NULL UNIQUE,                 -- Хэш пароля (используется SHA-512)
  role user_role NOT NULL,                                    -- Роль пользователя: 'ROLE_USER', 'ROLE_ADMIN'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()  -- Дата создания пользователя
);

-- Таблица для запросов на получение прав администратора
CREATE TABLE admin_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  approved_by INTEGER REFERENCES users(id),
  approval_date TIMESTAMP WITH TIME ZONE
);

-- Таблица локаций
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,                                           -- Уникальный идентификатор местоположения
  x DOUBLE PRECISION,                                              -- Координата X
  y BIGINT,                                                        -- Координата Y
  z BIGINT NOT NULL,                                               -- Координата Z
  created_by INTEGER NOT NULL REFERENCES users(id),                -- Идентификатор пользователя, создавшего местоположение
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),      -- Время создания персоны
  updated_by INTEGER REFERENCES users(id),                         -- Идентификатор пользователя, последнего обновившего местоположение
  updated_at TIMESTAMP WITH TIME ZONE                              -- Время последнего обновления
);

-- Таблица координат
CREATE TABLE coordinates (
  id SERIAL PRIMARY KEY,                                           -- Уникальный идентификатор координат
  x INTEGER NOT NULL CHECK (x <= 301),                             -- Координата X (максимум 301)
  y FLOAT NOT NULL,                                                -- Координата Y
  created_by INTEGER NOT NULL REFERENCES users(id),                -- Идентификатор пользователя, создавшего координату
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),      -- Время создания персоны
  updated_by INTEGER REFERENCES users(id),                         -- Идентификатор пользователя, последнего обновившего координату
  updated_at TIMESTAMP WITH TIME ZONE                              -- Время последнего обновления
);

-- Таблица пещер драконов
CREATE TABLE dragon_caves (
  id SERIAL PRIMARY KEY,                                           -- Уникальный идентификатор пещеры
  depth REAL,                                                      -- Глубина пещеры
  created_by INTEGER NOT NULL REFERENCES users(id),                -- Идентификатор пользователя, создавшего пещеру дракона
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),      -- Время создания персоны
  updated_by INTEGER REFERENCES users(id),                         -- Идентификатор пользователя, последнего обновившего пещеру дракона
  updated_at TIMESTAMP WITH TIME ZONE                              -- Время последнего обновления
);

-- Таблица голов драконов
CREATE TABLE dragon_heads (
  id SERIAL PRIMARY KEY,                                           -- Уникальный идентификатор головы дракона
  size BIGINT,                                                     -- Размер головы
  tooth_count REAL,                                                -- Количество зубов (может быть NULL)
  created_by INTEGER NOT NULL REFERENCES users(id),                -- Идентификатор пользователя, создавшего голову дракона
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),      -- Время создания персоны
  updated_by INTEGER REFERENCES users(id),                         -- Идентификатор пользователя, последнего обновившего голову дракона
  updated_at TIMESTAMP WITH TIME ZONE                              -- Время последнего обновления
);

-- Таблица персон
CREATE TABLE people (
  id SERIAL PRIMARY KEY,                                           -- Уникальный идентификатор персонажа
  name VARCHAR(255) NOT NULL CHECK (name <> ''),                   -- Имя персонажа (не может быть пустым)
  eye_color color NOT NULL,                                        -- Цвет глаз
  hair_color color,                                                -- Цвет волос (может быть NULL)
  location_id INTEGER NOT NULL REFERENCES locations(id),           -- Идентификатор местоположения (ссылка на таблицу location)
  birthday DATE NOT NULL,                                          -- Дата рождения персонажа
  height DOUBLE PRECISION NOT NULL CHECK (height > 0),             -- Рост персонажа (больше 0)
  passport_id VARCHAR(255) UNIQUE,                                 -- Паспорт персонажа (может быть NULL, уникален)
  created_by INTEGER NOT NULL REFERENCES users(id),                -- Идентификатор пользователя, создавшего персону
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),      -- Время создания персоны
  updated_by INTEGER REFERENCES users(id),                         -- Идентификатор пользователя, последнего обновившего персону
  updated_at TIMESTAMP WITH TIME ZONE                              -- Время последнего обновления
);

-- Таблица драконов
CREATE TABLE dragons (
  id SERIAL PRIMARY KEY,                                          -- Уникальный идентификатор дракона (генерируется автоматически)
  name VARCHAR(255) NOT NULL CHECK (name <> ''),                  -- Имя дракона (не может быть пустым)
  coordinates_id INTEGER NOT NULL REFERENCES coordinates(id),     -- Идентификатор координат
  cave_id INTEGER REFERENCES dragon_caves(id) ON DELETE SET NULL, -- Идентификатор пещеры дракона
  killer_id INTEGER REFERENCES people(id) ON DELETE SET NULL,     -- Идентификатор убийцы дракона
  age INTEGER CHECK (age IS NULL OR age > 0),                     -- Возраст дракона (больше 0), может быть NULL
  wingspan INTEGER CHECK (wingspan IS NULL OR wingspan > 0),      -- Размах крыльев (больше 0), может быть NULL
  speaking BOOLEAN,                                               -- Может ли говорить, может быть NULL
  type dragon_type NOT NULL,                                      -- Тип дракона
  head_id INTEGER REFERENCES dragon_heads(id) ON DELETE SET NULL, -- Идентификатор головы дракона
  created_by INTEGER NOT NULL REFERENCES users(id),               -- Идентификатор пользователя, создавшего дракона
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),     -- Время создания дракона
  updated_by INTEGER REFERENCES users(id),                        -- Идентификатор пользователя, последнего обновившего дракона
  updated_at TIMESTAMP WITH TIME ZONE                             -- Время последнего обновления
);

-- Индексы для оптимизации поиска и выборок
CREATE INDEX idx_dragon_name ON dragons(name);
CREATE INDEX idx_dragon_age ON dragons(age);
CREATE INDEX idx_dragon_type ON dragons(type);
CREATE INDEX idx_person_name ON people(name);

-- Ограничение внешних ключей для таблиц
ALTER TABLE dragons ADD CONSTRAINT fk_coordinates FOREIGN KEY (coordinates_id) REFERENCES coordinates(id);
ALTER TABLE dragons ADD CONSTRAINT fk_cave FOREIGN KEY (cave_id) REFERENCES dragon_caves(id);
ALTER TABLE dragons ADD CONSTRAINT fk_killer FOREIGN KEY (killer_id) REFERENCES people(id);
ALTER TABLE dragons ADD CONSTRAINT fk_head FOREIGN KEY (head_id) REFERENCES dragon_heads(id);
ALTER TABLE people ADD CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES locations(id);

COMMIT;
