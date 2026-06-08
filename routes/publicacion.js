import { Router } from "express"
import { 
    mostrarPublicaciones, 
    getCrearPublicacion,
    postCrearPublicaion,
    mostrarPublicacion,
    buscarPublicaciones,
    postMeGusta,
} from "../controler/publicacion.js"
import { postPublicarComentario } from "../controler/comentario.js"
import { authMiddleware } from '../middleware/autentificacion.js'

const publicacionRouter = Router()

//Publicacion
publicacionRouter.get('/publicacion', authMiddleware, mostrarPublicaciones)

publicacionRouter.get('/publicacion/buscar', authMiddleware, buscarPublicaciones)

publicacionRouter.get('/publicacion/crearPublicacion', authMiddleware, getCrearPublicacion)

publicacionRouter.post('/publicacion/crearPublicacion', authMiddleware, postCrearPublicaion)

publicacionRouter.get('/publicacion/:id', authMiddleware, mostrarPublicacion)

publicacionRouter.post('/publicacion/:id/comentario', authMiddleware, postPublicarComentario)

publicacionRouter.post('/publicacion/:id/megusta', authMiddleware, postMeGusta)

export default publicacionRouter