/*CREATE DATABASE optionalproject;*/

USE optionalproject;

CREATE TABLE IF NOT EXISTS movieproject (
  id INT AUTO_INCREMENT,
  titles VARCHAR(255),
  PRIMARY KEY (id)
);

INSERT INTO movieproject (titles) VALUES ('Billy Madison');
INSERT INTO movieproject (titles) VALUES ('The Matrix');


