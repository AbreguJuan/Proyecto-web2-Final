import { Router } from "express"

const mensajeRouter = Router()

//Mensaje
mensajeRouter.get('/mensaje', (req, res) => {
    res.render('mensaje/mensaje')
})

export default mensajeRouter