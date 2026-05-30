import { Router } from "express"
import { ingresarFormulario, ingresarUsuario, registrarseFormulario, registrarseUsuario, cerrarSesion } from "../controler/login.js"

const loginRouter = Router()

//Ingresar
loginRouter.get('/', (req, res) => {
    res.render('index')
})

loginRouter.get('/ingresar', ingresarFormulario)

loginRouter.post('/ingresar', ingresarUsuario)

loginRouter.get('/registrarse', registrarseFormulario)

loginRouter.post('/registrarse', registrarseUsuario)

loginRouter.get('/', cerrarSesion)

export default loginRouter