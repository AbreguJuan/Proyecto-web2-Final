import { Router } from "express"
import { ingresarFormulario, ingresarUsuario } from "../controler/login.js"

const loginRouter = Router()

//Ingresar
loginRouter.get('/', (req, res) => {
    res.render('index')
})

loginRouter.get('/ingresar', ingresarFormulario)

loginRouter.post('/ingresar', ingresarUsuario)

loginRouter.get('/registrarse', (req, res) => {
    res.render('login/registrarse')
})

export default loginRouter