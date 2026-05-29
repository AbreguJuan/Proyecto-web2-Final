import { Router } from "express"

const publicacionRouter = Router()

//Publicacion
publicacionRouter.get('/publicacion', (req, res) => {
    res.render('publicacion/publicacion')
})

export default publicacionRouter