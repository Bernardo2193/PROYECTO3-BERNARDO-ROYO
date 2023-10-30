CREATE DATABASE trailerflix;
USE trailerflix;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE generos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE actores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE contenido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poster VARCHAR(255) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  trailer VARCHAR(255),
  resumen TEXT,
  temporadas INT,
  idCategoria INT NOT NULL,
  FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);

CREATE TABLE generosContenido (
  idContenido INT NOT NULL,
  idGenero INT NOT NULL,
  FOREIGN KEY (idContenido) REFERENCES contenido(id),
  FOREIGN KEY (idGenero) REFERENCES generos(id)
);

CREATE TABLE actoresContenido (
  idContenido INT NOT NULL,
  idActor INT NOT NULL,
  FOREIGN KEY (idContenido) REFERENCES contenido(id),
  FOREIGN KEY (idActor) REFERENCES actores(id)
);
