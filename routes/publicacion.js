import { Router } from "express"
import { 
    mostrarPublicaciones, 
    getCrearPublicacion,
    postCrearPublicaion,
    mostrarPublicacion,
    buscarPublicaciones,
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

export default publicacionRouter