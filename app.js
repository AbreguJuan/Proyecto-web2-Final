import 'dotenv/config';
import express from 'express';
import sequelize from './modelos/config.js';
import './modelos/index.js';
import { connectDataBase } from './modelos/index.js';

// CONSTANTES

const PORT = process.env.PORT

const app = express()

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// RUTAS
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

// CONECCION A LA BASE DE DATOS
connectDataBase()
    .then(() => {
        //SERVIDOR
        app.listen(PORT, (err) => {
            if (err) {
                console.log('Error al iniciar el servidor: ', err)
                return
            }
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        })
    })
    .catch(err => {
        console.log('Error al conectar a la base de datos: ', err)
    })

