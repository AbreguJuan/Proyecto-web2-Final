import { Router } from "express"
import { mostrarUsuarios, perfilUsuario } from "../controler/usuario.js"

const usuarioRouter = Router()

//Usuario
usuarioRouter.get('/usuario', mostrarUsuarios)

usuarioRouter.get('/usuario/:username', perfilUsuario)

export default usuarioRouter