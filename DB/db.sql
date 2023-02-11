-- CREATE DATABASE WITH THE FOLLOWING SETTINGS

CREATE DATABASE tagify WITH
    ENCODING = 'utf8'
    TEMPLATE template0
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8';

--Create Table Users

CREATE TABLE users (
    user_id bigserial primary key not null,
    user_spotify_id varchar(100) not null,
    user_name varchar(100) not null,
    user_email varchar(100) not null
);

--Create Table tags
CREATE TABLE tags (
    tag_id bigserial primary key not null,
    tag_name varchar(100) not null,
    tag_user bigserial not null REFERENCES users(user_id),
    tag_songs text[]
);
   