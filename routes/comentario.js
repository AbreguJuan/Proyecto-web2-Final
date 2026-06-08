import { Router } from "express"
import { postPublicarComentario } from "../controler/comentario.js"
import { authMiddleware } from '../middleware/autentificacion.js'

const comentarioRouter = Router()

//Usuario
comentarioRouter.get('/publicacion/:id/comentario', authMiddleware)

comentarioRouter.post('/publicacion/:id/comentario', authMiddleware, postPublicarComentario)

export default comentarioRouter