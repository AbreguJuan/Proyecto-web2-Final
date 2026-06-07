import { Router } from "express"
import { 
    mostrarPublicaciones, 
    getCrearPublicacion,
    postCrearPublicaion
} from "../controler/publicacion.js"
import { authMiddleware } from '../middleware/autentificacion.js'

const publicacionRouter = Router()

//Publicacion
publicacionRouter.get('/publicacion', authMiddleware, mostrarPublicaciones)

publicacionRouter.get('/publicacion/crearPublicacion', authMiddleware, getCrearPublicacion)

publicacionRouter.post('/publicacion/crearPublicacion', authMiddleware, postCrearPublicaion)

export default publicacionRouter