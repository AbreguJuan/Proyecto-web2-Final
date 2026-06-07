import { Router } from "express"
import { mostrarUsuarios, perfilUsuario } from "../controler/usuario.js"
import { authMiddleware } from '../middleware/autentificacion.js'

const usuarioRouter = Router()

//Usuario
usuarioRouter.get('/usuario', authMiddleware, mostrarUsuarios)

usuarioRouter.get('/usuario/:username', authMiddleware, perfilUsuario)

export default usuarioRouter