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

import Imagen from './modelos/tablas/Imagen.js';
// CONSTANTES

const PORT = process.env.PORT

const app = express()

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.json( { limit: '10mb' }))
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

app.get('/gallery', async (req, res) => {
    const files = await Imagen.findAll();
    const arregloImagenes = []
    for (const imagen of files) {
        const imgBase64 = imagen.contenido.toString('base64')
        arregloImagenes.push({
            name: imagen.titulo,
            src: imagen.metadata + ',' + imgBase64
        })
    }
    res.render('imagen/view', {
        imagenes: arregloImagenes
    })
})

app.post('/img', async (req, res) => {
    const body = req.body
    const textBase64 = req.body.imgs[0].src
    const arregloBase64 = textBase64.split(',')
    
    const imgBuffer = Buffer.from(arregloBase64[1], 'base64')
    await Imagen.create({
        contenido: imgBuffer,
        titulo: req.body.imgs[0].name,
        metadata: arregloBase64[0]
    })
    //Conversion para guardar en db
    res.redirect('/gallery')
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

