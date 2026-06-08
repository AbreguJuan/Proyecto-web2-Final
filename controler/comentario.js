import { Usuario } from '../modelos/tablas/Usuario.js'
import { Publicacion } from '../modelos/tablas/Publicacion.js'
import { Comentario } from '../modelos/tablas/Comentario.js'
import comentarioRouter from '../routes/comentario.js'

export async function postPublicarComentario(req, res) {
    const idPublicacion = req.params.id
    const idUsuario = req.session.Usuario.id
    const { comentario } = req.body

    try {
        //Crear comentario
        const comentarioCreado = await Comentario.create({
            comentario,
            idUsuario
        })
        //Buscar la publicacion
        const publicacion = await Publicacion.findByPk(idPublicacion)

        if (!publicacion) {
            return res.redirect('/publicacion')
        }
        //Vincular el comentario con la publicacion
        await publicacion.addComentario(comentarioCreado)

        res.redirect(`/publicacion/${idPublicacion}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/publicacion/${idPublicacion}`)
    }
}