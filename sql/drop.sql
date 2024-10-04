-- Enums
DROP TYPE IF EXISTS dragon_type;
DROP TYPE IF EXISTS color;
DROP TYPE IF EXISTS user_role;

-- Indexes
DROP INDEX IF EXISTS idx_dragon_name;
DROP INDEX IF EXISTS idx_dragon_age;
DROP INDEX IF EXISTS idx_dragon_type;
DROP INDEX IF EXISTS idx_person_name;

-- Tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admin_requests;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS coordinates;
DROP TABLE IF EXISTS dragon_caves;
DROP TABLE IF EXISTS dragon_heads;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS dragons;
DROP TABLE IF EXISTS a;
