import { Router } from "express"

const coleccionRouter = Router()

//Coleccion
coleccionRouter.get('/coleccion', (req, res) => {
    res.render('coleccion/coleccion')
})

export default coleccionRouter