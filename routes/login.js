import { Router } from "express"

const loginRouter = Router()

//Ingresar
loginRouter.get('/', (req, res) => {
    res.render('index')
})

loginRouter.get('/ingresar', (req, res) => {
    res.render('login/ingresar')
})

loginRouter.get('/registrarse', (req, res) => {
    res.render('login/registrarse')
})

export default loginRouter