# Proyecto Integral N°3

El presente documento, es el **Proyecto Integral N°3** de ***Argentina Program 4.0***. Esta es una pequeña solución informática que sirve para realizarle consultas a una base de datos  acerca de Peliculas y Series.
La misma, fue diseñada y construida sobre una arquitectura API RESTful, la cual está desarrollada bajo las restricciones y recomendaciones de REST, además, implementa buenas prácticas de programación.

#### Especificaciones
- Autor: Bernardo Royo
- contacto : Royo2193@gmail.com
- Versión: 1.0.2

#### Requerimientos
- Nodemon: ^3.0.1
- Node.js v18.16.1
- MongoDB v5.7.0
- Dotenv ^16.3.1
- Eslint ^8.50.0
- Express ^4.18.2
- Mysql2 ^3.6.1
- Sequelize ^6.33.0
- Sequelize-views-support ^1.2.2
- GIT v2.40.1
- IDE - Visual Studio Code v1.78.2
- MYSQL Workbench 8.0 CE



#### Estructura de directorios
``` tree
    ├── node_modules
    ├── src
    │   └── conection
    │   │   └──connection.js
    │   └──DataBase
    │   │  └──migracionDatos.js
    │   │  └──trailerflix_-_Clase_27.json
    │   │  └──trailerflix-model.sql
    |   |  └──trailerflix-model.sql
    │   └──models
    │   │  └──catalogo.js
    │   │  └──categorias.js
    │   └── server.js
    │
    ├── .env.dist
    ├── .gitignore
    ├── package-lock.json 
    ├── package.json
    └── README.md
```

---
### CONFIGURACION DE ENTORNO
  - #### VARIABLES DE ENTORNO
    Se debe hacer una copia del archivo **.env.dist** y renombrarlo como **.env**. Con respecto a su contenido, es necesario asignar los valores a correspondientes a las variables:
    ``` js
        PORT=8080
        HOST="Ingrese un Host"

        DATABASE= trailerflix
        DBUSER=" Ingrese un usuario"
        PASSWORD="Ingrese una contraseña"

    ```




    
  ## CORRER API
   Correr el script del archivo trailerflix-model.sql que se encuentra en la carpeta DataBase , el cual nos creara el modelo relacional de las tablas en Mysql.
   Correr el script del archivo migracionDatos.js que se encuentra en la carpeta DataBase, el cual nos llenara los campos de las tablas con la informacion del archivo trailerflix_-_Clase_27.json.


 ### CORRER EL SERVIDOR HTTP
    El mismo se inicializa con el comando ***npm run start*** en donde "start" es un script generado en el package.json para correr el servidor.



  ### ERRORES & FORMATOS
    La comprobación de errores y formatos se ejecuta por medio del comando ***npm run eslint***. se hace por medio de Eslint. Para visualizar los errores en tiempo de escritura, se debe tener instalada la extensión de **Eslint** en Visual Studio Code.


## Métodos HTTP
 #### En este proyecto todos los metodos solicitados son de consulta , las URL son las siguientes:
  
| Tipo | URI | Descripción |
|------|-----|-------------|
| GET |  http://localhost:8080/categorias | (servirá información de todas las categorías existentes) |
| GET |  http://localhost:8080//catalogo |(servirá el catálogo completo ‘la vista SQL’)|
| GET |  http://localhost:8080//catalogo/:id  | filtra por código de la película/serie|
| GET | http://localhost:8080/catalogo/nombre/:nombre  | filtra por nombre o parte del nombre|
| GET |  http://localhost:8080/catalogo/genero/:genero | filtra por género del contenido |
| GET |  http://localhost:8080/catalogo/categoria/:categoria | filtrar por cualquier categoría que pueda existir|





### Observaciones :
 - Cuando inicio el server la primera vez  por alguna razon me esta tardando 5 min en levantar el server.Una vez que corre me tira un warning con Sequelize.
 - Las URL asignadas para el proyecto al ser todas del tipo GET se pisan los mensajes de error de todos los GET que tengan que ver con "catalogo".Siempre que resulte una peticion en error , me trae el error del la URL que trae el catalogo completo.

### Correcciones respecto a la version 1.0.1 :
 - Se le hizo la correccion correspondiente a la declaracion del modelo Vista_Trailerflix .
 - Se creo una nueva funcion llamada " buildMultiElementsResponse() ", la cual soluciona el caso de devolver una coleccion vacia , remplazandola por un    mensaje de error.Asi mismo dicha funcion mejora el manejo de errores , volviendo un poco mas robusto el manejo de errores en el servidor .
 