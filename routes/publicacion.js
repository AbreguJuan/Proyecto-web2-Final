import { Router } from "express"
import { 
    mostrarPublicaciones, 
    getCrearPublicacion,
    postCrearPublicaion
} from "../controler/publicacion.js"

const publicacionRouter = Router()

//Publicacion
publicacionRouter.get('/publicacion', mostrarPublicaciones)

publicacionRouter.get('/publicacion/crearPublicacion', getCrearPublicacion)

publicacionRouter.post('/publicacion/crearPublicacion', postCrearPublicaion)

export default publicacionRouter