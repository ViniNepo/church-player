-- Adminer 4.8.1 MySQL 8.2.0 dump

SET NAMES utf8;
SET
time_zone = '+00:00';
SET
foreign_key_checks = 0;
SET
sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `album`;
CREATE TABLE `album`
(
  `id`         int          NOT NULL AUTO_INCREMENT,
  `album_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `album` (`id`, `album_name`)
VALUES (1, 'CD Jovem 2001'),
       (2, 'Hinario Adventista'),
       (3, 'Adoradores'),
       (4, 'Novo Tom'),
       (5, 'CD Jovem 2019'),
       (6, 'Celebra São Paulo'),
       (7, 'Cantico Vocal');

DROP TABLE IF EXISTS `album_song`;
CREATE TABLE `album_song`
(
  `album_id` int NOT NULL,
  `song_id`  int NOT NULL,
  PRIMARY KEY (`album_id`, `song_id`),
  KEY        `song_id` (`song_id`),
  CONSTRAINT `album_song_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT `album_song_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `album_song` (`album_id`, `song_id`)
VALUES (1, 1),
       (2, 2),
       (7, 3),
       (2, 4);

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs`
(
  `id`          int          NOT NULL AUTO_INCREMENT,
  `song_name`   varchar(100) NOT NULL,
  `song_number` varchar(100) DEFAULT NULL,
  `duration`    time         NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `songs` (`id`, `song_name`, `song_number`, `duration`)
VALUES (1, 'Coragem pra vencer', NULL, '00:00:03'),
       (2, 'Alvo Mais que a Neve', '4', '00:00:04'),
       (3, 'Jerusalem', NULL, '00:00:05'),
       (4, 'Achei um grande amigo', '8', '00:00:03');

DROP TABLE IF EXISTS `worship`;
CREATE TABLE `worship`
(
  `id`           int          NOT NULL AUTO_INCREMENT,
  `worship_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `worship` (`id`, `worship_name`)
VALUES (1, 'Oficial program'),
       (2, 'Christimans program'),
       (3, 'JA program');

DROP TABLE IF EXISTS `worship_songs`;
CREATE TABLE `worship_songs`
(
  `worship_id` int NOT NULL,
  `song_id`    int NOT NULL,
  `label`      varchar(100) DEFAULT NULL,
  PRIMARY KEY (`worship_id`, `song_id`),
  CONSTRAINT `worship_songs_ibfk_1` FOREIGN KEY (`worship_id`) REFERENCES `songs` (`id`),
  CONSTRAINT `worship_songs_ibfk_2` FOREIGN KEY (`worship_id`) REFERENCES `worship` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `worship_songs` (`worship_id`, `song_id`, `label`)
VALUES (1, 1, 'First song'),
       (1, 2, 'Introduction'),
       (1, 4, 'Exit');

-- 2023-12-08 00:28:01
