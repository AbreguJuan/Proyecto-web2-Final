import { Usuario } from "../modelos/tablas/Usuario.js"

export async function authMiddleware(req, res, next) {
    console.log('authMiddleware:', req.method, req.path)
    const user = req.session.Usuario; //Usuario de la sesion solo contiene id
    if (!user) {
        return res.redirect('/ingresar')
    }

    try {
        const usuarioEncontrado = await Usuario.findByPk(Number(user.id), {
            attributes: ['idUsuario', 'username', 'firstName', 'lastName']
        })

        if (!usuarioEncontrado) {
            return res.redirect('/ingresar')
        }

        res.locals.currentUser = {
            id: usuarioEncontrado.idUsuario,  
            username: usuarioEncontrado.username,
            firstName: usuarioEncontrado.firstName,
            lastName: usuarioEncontrado.lastName
        }

    } catch (error) {
        console.error('error al autenticar usuario: ', error)
        return res.redirect('/ingresar')
    }

    next()
}