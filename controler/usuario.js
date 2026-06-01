import { Usuario } from '../modelos/tablas/Usuario.js'

export async function mostrarUsuarios(req, res) {
    res.render('usuario/usuario')
}

export async function perfilUsuario(req, res) {
    try {
        const name = req.params.username;
        const usuario = await Usuario.findOne({
            where: {
                username: name
            }
        })

        if (!usuario) {
            console.log("No se encontro al usuario")
            //return res.redirect("/usuario")
        }
        
    } catch (error) {
        console.log("Error al entrar al perfil: ", error)
    }

}