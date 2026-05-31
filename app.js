import 'dotenv/config';
import express from 'express';
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

// CONSTANTES

const PORT = process.env.PORT

const app = express()

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

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

// RUTA DE PRUEBA de Imagenes
app.get('/img', (req, res) => {
    res.render('imagen/indexImagen')
})

app.post('/img', (req, res) => {
    const imgSubida = req.body.imagenBase64
    res.render('imagen/view', {
        imagen: {
            src: imgSubida
        }
    })
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

