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
        //console.log(usuario)

        if (!usuario) {
            console.log("No se encontro al usuario")
            //return res.redirect("/usuario")
        }
        // Renderizar la vista pasando el usuario convertido a JSON
        res.render('usuario/usuario', { Usuario: usuario.toJSON() });
    } catch (error) {
        console.log("Error al entrar al perfil: ", error)
    }

}