
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const sequelize = require("./conection/connection");
const Categorias = require('./models/categorias.js');
const Catalogo = require('./models/catalogo.js');
const {Op}=require('sequelize');
const server = express();

server.use(express.json());

const messageErrorServer = { message: 'Se produjo un error en el server' };

server.use(express.urlencoded({ extended: true }));



// me trae categorias

server.get('/categorias', async (req, res) => {


    try {
     const categorias = await Categorias.findAll()

        buildMultiElementsResponse(res,categorias);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } 
});

//me trae el catalogo

server.get('/catalogo', async (req, res) => {


    try {
     const catalogo = await Catalogo.findAll()

     buildMultiElementsResponse(res,catalogo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } 
});

//catalogo/:id (filtrar por código de la película/serie)

server.get('/catalogo/:id', async (req, res) => {
    const  id  = req.params.id;

    if (Number.isNaN(Number(id))) {
        res.status(400).send({ message: "Falta informacion relevante" })
        return
    }


    try {
     const contenido = await Catalogo.findByPk(id)
     if (!contenido) {
        res.status(404).send({ message: "El ID no se encontró" })
        return
    }

        res.status(200).send( contenido );
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } 

});

//catalogo/nombre/:nombre (filtrar por nombre o parte del nombre)

server.get('/catalogo/nombre/:nombre', async (req, res) => {
    const  nombre  = req.params.nombre;

    if (!nombre) {
        res.status(400).send({ message: "El nombre no puede ser nulo" })
        return
    }

    try {
     const contenido = await Catalogo.findAll(
        {
            where:{
                titulo:{ [Op.like]: `%${nombre}%`} 
            }
        }
     )
     
     buildMultiElementsResponse(res,contenido);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } 

});

///catalogo/genero/:genero (filtrar por género del contenido)
server.get('/catalogo/genero/:genero', async (req, res) => {
    const  genero  = req.params.genero;

    if (!genero) {
        res.status(400).send({ message: "El genero no puede ser nulo" })
        return
    }

    try {
     const contenido = await Catalogo.findAll(
        {
            where:{
                genero:{ [Op.like]: `%${genero}%`} 
            }
        }
     )
     
     buildMultiElementsResponse(res,contenido);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } 

});

//catalogo/categoria/:categoria (filtrar por serie - película o cualquier otra categoría que pueda existir)

server.get('/catalogo/categoria/:categoria', async (req, res) => {
    const  categoria  = req.params.categoria;

    if (!categoria) {
        res.status(400).send({ message: "La categoria no puede ser nula" })
        return
    }

    try {
     const contenido = await Catalogo.findAll(
        {
            where:{
                categoria:{ [Op.eq]:categoria} 
            }
        }
     )
     
     buildMultiElementsResponse(res,contenido);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } 

});


//Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

//Crea una respuesta contemplando el caso de una respuesta  vacia 

function buildMultiElementsResponse(res, content)  {
    if(!content.length){
        res.status (400).send(`<h1>Error 404</h1><h3>No se econtraron elementos para la busqueda realizada</h3>`)

    }
    else {
        res.status (200).send (content)
    }
 }



// Método oyente de solicitudes
sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(()=>{
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
        });
    }).catch(()=>{
        console.log("Hubo un problema con la sincronización con la base de datos.")
        
        
    })
}).catch(() => {
    console.log("Hubo un problema con la conexión a la base de datos.")
    console.log()
});
