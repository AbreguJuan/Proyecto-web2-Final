import { Router } from "express"

const usuarioRouter = Router()

//Usuario
usuarioRouter.get('/usuario', (req, res) => {
    res.render('usuario/usuario')
})

export default usuarioRouter