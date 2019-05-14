CREATE DATABASE library;

USE library;

CREATE TABLE users(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    address  VARCHAR(50) NOT NULL,
    municipality VARCHAR(30) NOT NULL,
    cp INT(5) NOT NULL,
    tel VARCHAR(11) NOT NULL
);
CREATE TABLE books(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    editorial VARCHAR(50) NOT NULL,
    subject VARCHAR (50) NOT NULL,
    acquisition TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price FLOAT(7,2) NOT NULL
);
CREATE TABLE providers(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_book INT(10),
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    tel VARCHAR(10) NOT NULL,
    website LONGTEXT NOT NULL,
    FOREIGN KEY(id_book) REFERENCES books(id)
);

CREATE TABLE lendings(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INT(10),
    id_book INT(10),
    retired_day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user) REFERENCES users(id), 
    FOREIGN KEY(id_book) REFERENCES books(id)
);

CREATE TABLE returns(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INT(10),
    id_book INT(10),
    id_lendings INT (10),
    return_day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user) REFERENCES users(id), 
    FOREIGN KEY(id_book) REFERENCEs books(id),
    FOREIGN KEY(id_lendings) REFERENCES lendings(id)
);

CREATE TABLE delinquent_user(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INT(10),
    id_lendings INT (10),
    FOREIGN KEY(id_user) REFERENCES users(id), 
    FOREIGN KEY(id_lendings) REFERENCES lendings(id)
);