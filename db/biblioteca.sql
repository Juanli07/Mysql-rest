CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE users(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    address  VARCHAR(50) NOT NULL,
    municipality VARCHAR(30) NOT NULL,
    cp INT(5) NOT NULL,
    tel VARCHAR(11) NOT NULL
);