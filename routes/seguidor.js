import { Router } from "express"

const seguidorRouter = Router()

//Seguidor
seguidorRouter.get('/seguidor', (req, res) => {
    res.render('seguidor/seguidor')
})

export default seguidorRouter