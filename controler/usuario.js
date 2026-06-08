import { Usuario } from '../modelos/tablas/Usuario.js'
import { Publicacion } from '../modelos/tablas/Publicacion.js'
import { Imagen } from '../modelos/tablas/Imagen.js'
import { Etiqueta } from '../modelos/tablas/Etiqueta.js'
import { Comentario } from '../modelos/tablas/Comentario.js'
import { MeGusta } from '../modelos/tablas/MeGusta.js'

export async function mostrarUsuarios(req, res) {
    try {
        const usuario = await Usuario.findByPk(res.locals.currentUser.id)

        if (!usuario) {
            return res.redirect('/ingresar')
        }

        res.render('usuario/usuario', { Usuario: usuario.toJSON() })
    } catch (error) {
        console.log("Error al mostrar usuario: ", error)
    }
}

export async function perfilUsuario(req, res) {
    try {
        const name = req.params.username

        const usuario = await Usuario.findOne({
            where: { username: name },
            include: [{
                model: Publicacion,
                as: 'Publicaciones',
                include: [
                    { model: Imagen },
                    { model: Etiqueta },
                    { model: Comentario }
                ]
            }]
        })

        if (!usuario) {
            return res.redirect('/usuario')
        }

        const usuarioJson = usuario.toJSON()

        // Convertir imágenes y agregar autor a cada publicacion
        usuarioJson.Publicaciones = await Promise.all(usuarioJson.Publicaciones.map(async post => {
            post.Imagens = post.Imagens.map(img => ({
                ...img,
                src: `${img.metadata},${Buffer.from(img.contenido).toString('base64')}`
            }))
            post.MeGustas = await MeGusta.findAll({ where: { idPublicacion: post.idPublicacion } })
            post.Autor = usuarioJson  // el autor es el mismo usuario del perfil
            return post
        }))

        res.render('usuario/usuario', { Usuario: usuarioJson })
    } catch (error) {
        console.log("Error al entrar al perfil: ", error)
    }
}