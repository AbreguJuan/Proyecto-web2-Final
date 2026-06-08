import 'dotenv/config';
import express, { text } from 'express';
import session from 'express-session';
import sequelize from './modelos/config.js';
import { connectDataBase } from './modelos/index.js';
//importar las rutas
import loginRouter from './routes/login.js'
import usuarioRouter from './routes/usuario.js'
import publicacionRouter from './routes/publicacion.js'
import coleccionRouter from './routes/coleccion.js'
import seguidorRouter from './routes/seguidor.js'
import notificacionRouter from './routes/notificacion.js'
import mensajeRouter from './routes/mensaje.js'
//import comentarioRouter from './routes/comentario.js'

//import imagenRouter from './routes/imagen.js';

// CONSTANTES

const PORT = process.env.PORT

const app = express()

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
//Para mantener la sesion activa
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    cookie: {
        secure: false, //en produccion cambiarlo a true
        maxAge: 24 * 60 * 60 * 1000, // 24h * 60m * 60s * 1000milisegundos
        httpOnly: true,
        sameSite: 'lax' //SERVER SIDE RENDERY (SSR)
    }
}))

// MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
app.set('views', './views');

// RUTAS
app.use('/', loginRouter)
app.use('/', usuarioRouter)
app.use('/', publicacionRouter)
app.use('/', coleccionRouter)
app.use('/', seguidorRouter)
app.use('/', notificacionRouter)
app.use('/', mensajeRouter)
//app.use('/', comentarioRouter)

//app.use('/', imagenRouter)

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

