import { Usuario } from '../modelos/tablas/Usuario.js'
import { Publicacion } from '../modelos/tablas/Publicacion.js'
import { Imagen } from '../modelos/tablas/Imagen.js'
import { Etiqueta } from '../modelos/tablas/Etiqueta.js'
import { Comentario } from '../modelos/tablas/Comentario.js'
import { MeGusta } from '../modelos/tablas/MeGusta.js'
import { Seguidores } from '../modelos/tablas/Seguidores.js'

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
            include: [
                {
                    model: Publicacion,
                    as: 'Publicaciones',
                    include: [
                        { model: Imagen },
                        { model: Etiqueta },
                        { model: Comentario }
                    ]
                },
                { model: Seguidores, as: 'Seguidores' },
                { model: Seguidores, as: 'Siguiendo' }
            ]
        })

        if (!usuario) {
            return res.redirect('/usuario')
        }

        const usuarioJson = usuario.toJSON()
        const esSeguido = await Seguidores.findOne({
            where: {
                idUsuario: res.locals.currentUser.id,
                idUsuarioSeguido: usuario.idUsuario
            }
        })

        //Trae las publicaciones propias al perfil
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

        //res.render('publicacion/publicaciones')
        res.render('usuario/usuario', { Usuario: usuarioJson, esSeguido: !!esSeguido })
    } catch (error) {
        console.log("Error al entrar al perfil: ", error)
    }
}

export async function seguirUsuario(req, res) {
    const idUsuario = req.session.Usuario.id
    const idUsuarioSeguido = req.params.id  // id del usuario a seguir

    try {
        // No puede seguirse a sí mismo
        if (idUsuario === parseInt(idUsuarioSeguido)) {
            return res.redirect(`/usuario/${req.params.username}`)
        }

        // Verificar si ya lo sigue
        const seguidorExistente = await Seguidores.findOne({
            where: { idUsuario, idUsuarioSeguido }
        })

        if (seguidorExistente) {
            // Si ya lo sigue, deja de seguirlo
            await seguidorExistente.destroy()
        } else {
            // Si no lo sigue, lo sigue
            await Seguidores.create({ idUsuario, idUsuarioSeguido })
        }

        res.redirect(`/usuario/${req.params.username}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/usuario/${req.params.username}`)
    }
}
//Muestra los Seguidores
export async function mostrarSeguidores(req, res) {
    try {
        const name = req.params.username
        const usuario = await Usuario.findOne({
            where: { username: name },
            include: [{ 
                model: Seguidores, 
                as: 'Seguidores',
                include: [{ model: Usuario, as: 'Seguidor' }]
            }]
        })

        if (!usuario) return res.redirect('/usuario')

        res.render('usuario/seguidores', { Usuario: usuario.toJSON() })
    } catch (error) {
        console.log(error)
    }
}
//Muestra a los que sigues
export async function mostrarSiguiendo(req, res) {
    try {
        const name = req.params.username
        const usuario = await Usuario.findOne({
            where: { username: name },
            include: [{ 
                model: Seguidores, 
                as: 'Siguiendo',
                include: [{ model: Usuario, as: 'Seguido' }]
            }]
        })

        if (!usuario) return res.redirect('/usuario')

        res.render('usuario/siguiendo', { Usuario: usuario.toJSON() })
    } catch (error) {
        console.log(error)
    }
}