import { Router } from "express"

const notificacionRouter = Router()

//Notificacion
notificacionRouter.get('/notificacion', (req, res) => {
    res.render('notificacion/notificacion')
})

export default notificacionRouter