-- CREATE DATABASE WITH THE FOLLOWING SETTINGS

CREATE DATABASE tagify WITH
    ENCODING = 'utf8'
    TEMPLATE template0
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8';

--Create Table Users

CREATE TABLE users (
    user_id bigserial primary key not null,
    user_spotify_id varchar(100) not null unique,
    user_name varchar(100) not null,
    user_email varchar(100) not null
);

--Create Table tags
CREATE TABLE tags (
    tag_id bigserial primary key not null,
    tag_name varchar(100) not null,
    tag_user varchar(100) REFERENCES users(user_spotify_id),
    tag_tracks text[]
);

INSERT INTO users (user_spotify_id, user_name, user_email) VALUES ('31wvoojuwwhfjik46vdzgk6g2qey', 'Mateo', 'mateo@gmail.com');
   
INSERT INTO tags ( tag_name, tag_user, tag_tracks) VALUES ('after', '31wvoojuwwhfjik46vdzgk6g2qey', '{6YUTL4dYpB9xZO5qExPf05}');
INSERT INTO tags ( tag_name, tag_user, tag_tracks) VALUES ('bailable', '31wvoojuwwhfjik46vdzgk6g2qey', '{1gihuPhrLraKYrJMAEONyc}');
INSERT INTO tags ( tag_name, tag_user, tag_tracks) VALUES ('triste', '31wvoojuwwhfjik46vdzgk6g2qey', '{698ItKASDavgwZ3WjaWjtz}');
INSERT INTO tags ( tag_name, tag_user, tag_tracks) VALUES ('ex', '31wvoojuwwhfjik46vdzgk6g2qey', '{2lLG56qpLP3UbcLuzMvkWX}');
INSERT INTO tags ( tag_name, tag_user, tag_tracks) VALUES ('cantable', '31wvoojuwwhfjik46vdzgk6g2qey', '{0F13K9dwYH2zpTWiR8d628}');
INSERT INTO tags ( tag_name, tag_user, tag_tracks) VALUES ('sad', '31wvoojuwwhfjik46vdzgk6g2qey', '{0F13K9dwYH2zpTWiR8d628, 2lLG56qpLP3UbcLuzMvkWX, 698ItKASDavgwZ3WjaWjtz, 1gihuPhrLraKYrJMAEONyc, 6YUTL4dYpB9xZO5qExPf05}');
