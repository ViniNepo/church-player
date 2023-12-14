CREATE DATABASE IF NOT EXISTS church_player;

CREATE TABLE songs
(
  id          INT PRIMARY KEY AUTO_INCREMENT,
  song_name   VARCHAR(100) NOT NULL,
  song_number VARCHAR(100),
  duration    TIME         NOT NULL
);

CREATE TABLE albums
(
  id         INT PRIMARY KEY AUTO_INCREMENT,
  album_name VARCHAR(100) NOT NULL
);

CREATE TABLE album_song
(
  album_id INT,
  song_id  INT
);

CREATE TABLE worship
(
  id           INT PRIMARY KEY AUTO_INCREMENT,
  worship_name VARCHAR(100) NOT NULL
);

CREATE TABLE worship_songs
(
  worship_id INT,
  song_id    INT,
  label      VARCHAR(100)
);

ALTER TABLE worship_songs
  ADD CONSTRAINT worship_songs_pk PRIMARY KEY (worship_id, song_id);

ALTER TABLE album_song
  ADD CONSTRAINT album_song_pk PRIMARY KEY (album_id, song_id);

ALTER TABLE worship_songs
  ADD FOREIGN KEY (worship_id) REFERENCES songs(id);

ALTER TABLE worship_songs
  ADD FOREIGN KEY (worship_id) REFERENCES worship(id);

ALTER TABLE album_song
  ADD FOREIGN KEY (album_id) REFERENCES album(id);

ALTER TABLE album_song
  ADD FOREIGN KEY (song_id) REFERENCES songs(id);


