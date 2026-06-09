import { Router } from "express"
import { 
    mostrarUsuarios, 
    perfilUsuario, 
    seguirUsuario,
    mostrarSeguidores,
    mostrarSiguiendo,
} from "../controler/usuario.js"
import { authMiddleware } from '../middleware/autentificacion.js'

const usuarioRouter = Router()

//Usuario
usuarioRouter.get('/usuario', authMiddleware, mostrarUsuarios)

usuarioRouter.get('/usuario/:username', authMiddleware, perfilUsuario)

usuarioRouter.post('/usuario/:username/:id/seguir', authMiddleware, seguirUsuario)

usuarioRouter.get('/usuario/:username/seguidores', authMiddleware, mostrarSeguidores)

usuarioRouter.get('/usuario/:username/siguiendo', authMiddleware, mostrarSiguiendo)

export default usuarioRouter