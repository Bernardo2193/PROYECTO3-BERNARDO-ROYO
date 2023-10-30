const mysql = require('mysql2');
const fs = require('fs');

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trailerflix'
};

/// Leer el archivo JSON con los datos
const jsonData = fs.readFileSync('./trailerflix_-_Clase_27.json', 'utf8');
const data = JSON.parse(jsonData);

// Crear una conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
        throw err;
    }

    console.log('Conexión a la base de datos establecida.');

    // Insertar datos en la tabla 'categorias'
    for (const item of data) {
        const categoria = item.categoria;
        connection.query('INSERT IGNORE INTO categorias (nombre) VALUES (?)', [categoria], (err, result) => {
            if (err) {
                console.error('Error al insertar en categorias:', err);
                throw err;
            }
            if (result.affectedRows === 1) {
                console.log('Categoría insertada con ID:', result.insertId);
            } else {
                console.log('Categoría duplicada o ya existente:', categoria);
            }

            // Buscar el ID de la categoría recién insertada
            connection.query('SELECT id FROM categorias WHERE nombre = ?', [categoria], (err, result) => {
                if (err) {
                    console.error('Error al buscar ID de categoría:', err);
                    throw err;
                }
                const idCategoria = result[0].id;

                // Insertar datos en la tabla 'contenido'
                const poster = item.poster;
                const titulo = item.titulo;
                const trailer = item.trailer;
                const resumen = item.resumen;
                const temporadas = item.temporadas === 'N/A' ? null : item.temporadas;

                connection.query('INSERT INTO contenido (poster, titulo, resumen, temporadas, trailer, idCategoria) VALUES (?,?, ?, ?, ?, ?)', [poster, titulo, resumen, temporadas,trailer, idCategoria], (err, result) => {
                    if (err) {
                        console.error('Error al insertar en contenido:', err);
                        throw err;
                    }
                    console.log('Contenido insertado con ID:', result.insertId);

                    // Buscar el ID del contenido recién insertado
                    const idContenido = result.insertId;

                    // Insertar datos en la tabla 'generosContenido'
                    const generos = item.genero.split(', ');
                    for (const genero of generos) {
                        connection.query('INSERT IGNORE INTO generos (nombre) VALUES (?)', [genero], (err) => {
                            if (err) {
                                console.error('Error al insertar en generos:', err);
                                throw err;
                            }

                            // Buscar el ID del género recién insertado
                            connection.query('SELECT id FROM generos WHERE nombre = ?', [genero], (err, result) => {
                                if (err) {
                                    console.error('Error al buscar ID de género:', err);
                                    throw err;
                                }
                                const idGenero = result[0].id;

                                // Insertar la relación en 'generosContenido'
                                connection.query('INSERT INTO generosContenido (idContenido, idGenero) VALUES (?, ?)', [idContenido, idGenero], (err) => {
                                    if (err) {
                                        console.error('Error al insertar en generosContenido:', err);
                                        throw err;
                                    }
                                    console.log('Relación generoContenido insertada.');
                                });
                            });
                        });
                    }

                    // Insertar datos en la tabla 'actoresContenido'
                    const actores = item.reparto.split(', ');
                    for (const actor of actores) {
                        connection.query('INSERT IGNORE INTO actores (nombre) VALUES (?)', [actor], (err) => {
                            if (err) {
                                console.error('Error al insertar en actores:', err);
                                throw err;
                            }

                            // Buscar el ID del actor recién insertado
                            connection.query('SELECT id FROM actores WHERE nombre = ?', [actor], (err, result) => {
                                if (err) {
                                    console.error('Error al buscar ID de actor:', err);
                                    throw err;
                                }
                                const idActor = result[0].id;

                                // Insertar la relación en 'actoresContenido'
                                connection.query('INSERT INTO actoresContenido (idContenido, idActor) VALUES (?, ?)', [idContenido, idActor], (err) => {
                                    if (err) {
                                        console.error('Error al insertar en actoresContenido:', err);
                                        throw err;
                                    }
                                    console.log('Relación actorContenido insertada.');
                                });
                            });
                        });
                    }
                });
            });
        });
    }
});
