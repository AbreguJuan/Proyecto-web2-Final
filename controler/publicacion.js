import { Usuario } from '../modelos/tablas/Usuario.js'
import { Publicacion } from '../modelos/tablas/Publicacion.js'
import { Imagen } from '../modelos/tablas/Imagen.js'
import { Etiqueta } from '../modelos/tablas/Etiqueta.js'
import { Comentario } from '../modelos/tablas/Comentario.js'
import { MeGusta } from '../modelos/tablas/MeGusta.js'
import { Valoracion } from '../modelos/tablas/Valoracion.js'
import { Seguidores } from '../modelos/tablas/Seguidores.js'
import usuarioRouter from '../routes/usuario.js'

import { Op } from 'sequelize'
//Muestra la publicacion seleccionada (findOne)
export async function mostrarPublicacion(req, res) {
    try {
        const idPublicacion = req.params.id

        const publicacion = await Publicacion.findOne({
            where: { idPublicacion },
            include: [
                { model: Usuario, as: 'Autor' },
                { model: Imagen },
                { model: Etiqueta },
                {
                    model: Comentario,
                    include: [{ model: Usuario, as: 'AutorDelComentario' }]
                },
                { model: Valoracion }
            ]
        })

        if (!publicacion) {
            return res.redirect('/publicacion')
        }

        // Me gustas por separado
        const meGustas = await MeGusta.findAll({
            where: { idPublicacion }
        })

        const publicacionJson = publicacion.toJSON()
        publicacionJson.Imagens = publicacionJson.Imagens.map(img => ({
            ...img,
            src: `${img.metadata},${Buffer.from(img.contenido).toString('base64')}`
        }))
        publicacionJson.MeGustas = meGustas

        console.log('IDPUBLICACION:', publicacionJson.idPublicacion) 
        
        res.render('publicacion/mostrarPublicacion', { Publicacion: publicacionJson })
    } catch (error) {
        console.log(error)
    }
}
//Muestra todas las publicaciones (findAll)
export async function mostrarPublicaciones(req, res) {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [
                { model: Usuario, as: 'Autor' },
                { model: Imagen },
                { model: Etiqueta },
                { model: Comentario },
                { model: Valoracion }
            ],
            order: [['createdAt', 'DESC']]
        })

        const publicacionesConImagenes = await Promise.all(publicaciones.map(async post => {
            const postJson = post.toJSON()
            postJson.Imagens = postJson.Imagens.map(img => ({
                ...img,
                src: `${img.metadata},${Buffer.from(img.contenido).toString('base64')}`
            }))
            // Me gustas por separado para cada publicacion
            postJson.MeGustas = await MeGusta.findAll({
                where: { idPublicacion: postJson.idPublicacion }
            })
            postJson.Valoraciones = await Valoracion.findAll({ 
                where: { idPublicacion: postJson.idPublicacion }
            })
            return postJson
        }))

        res.render('publicacion/publicaciones', { Publicacion: publicacionesConImagenes })
    } catch (error) {
        console.log(error)
    }
}

export async function getCrearPublicacion(req, res) {
    res.render('publicacion/crearPublicacion')
}
//Crea una nueva publicacion (POST)
export const postCrearPublicaion = async (req, res) => {
    const { titulo, contenido, img, etiqueta } = req.body;
    //Datos para obtener al usuario y mandarlo al pug
    const idUsuario = req.session.Usuario.id
    try {
        //PUBLICACION
        const post = await Publicacion.create({
            titulo,
            contenido,
            idUsuario
        })
        //IMAGEN
        if (req.body.imgs) {
            const imagenes = req.body.imgs
            for (const img of imagenes) {
                const textBase64 = img.src
                const arregloBase64 = textBase64.split(',')
                const imgBuffer = Buffer.from(arregloBase64[1], 'base64')
                const ImagenCreada = await Imagen.create({
                    contenido: imgBuffer,
                    titulo: req.body.imgs[0].name,
                    metadata: arregloBase64[0]
                })
                //Llena la tabla relacion de imagenesPublicacion
                await post.addImagen(ImagenCreada)
            }
        }
        // ETIQUETAS
        if (etiqueta) {
            // Separar por coma o espacio
            const nombresEtiquetas = etiqueta
                .split(/[\s,]+/)        // separa por espacio o coma
                .filter(e => e !== '')  // elimina strings vacíos

            for (const nombre of nombresEtiquetas) {
                // Si existe la usa, si no la crea
                const [etiquetaEncontrada] = await Etiqueta.findOrCreate({
                    where: { etiqueta: nombre.toLowerCase() }
                })
                await post.addEtiqueta(etiquetaEncontrada)
            }
        }
        //Si todo anda bien, me redirige al menu
        res.redirect('/publicacion')
        //Sino entra al catch
    } catch (error) {
        console.log(error)
        res.redirect('/publicacion/crearPublicacion')
    }
}
//Busca Publicaciones por etiqueta o Usuario (findAll)
export async function buscarPublicaciones(req, res) {
    const { buscar } = req.query
    try {
        const publicaciones = await Publicacion.findAll({
            include: [
                { model: Usuario, as: 'Autor', required: false },
                { model: Imagen },
                { model: Etiqueta, required: false },
                { model: Comentario },
                { model: Valoracion }
            ],
            where: {
                [Op.or]: [
                    { '$Autor.username$': { [Op.iLike]: `%${buscar}%` } },
                    { '$Etiqueta.etiqueta$': { [Op.iLike]: `%${buscar}%` } }
                ]
            },
            order: [['createdAt', 'DESC']]
        })
        const publicacionesConImagenes = publicaciones.map(post => {
            const postJson = post.toJSON()
            postJson.Imagens = postJson.Imagens.map(img => ({
                ...img,
                src: `${img.metadata},${Buffer.from(img.contenido).toString('base64')}`
            }))
            return postJson
        })
        console.log('KEYS POST:', Object.keys(publicacionesConImagenes[0]))
        res.render('publicacion/publicaciones', { Publicacion: publicacionesConImagenes })
    } catch (error) {
        console.log(error)
        res.redirect('/publicacion')
    }
}
//Dar Me Gusta a una publicacion
export async function postMeGusta(req, res) {
    console.log('entró a postMeGusta, id:', req.params.id)
    console.log('session:', req.session.Usuario)
    const idPublicacion = req.params.id
    const idUsuario = req.session.Usuario.id

    try {
        const publicacion = await Publicacion.findByPk(idPublicacion)

        if (!publicacion) {
            return res.redirect('/publicacion')
        }

        // No puede darse me gusta a su propia publicacion
        if (publicacion.idUsuario === idUsuario) {
            return res.redirect(`/publicacion/${idPublicacion}`)
        }

        // Verificar si ya le dio me gusta
        const meGustaExistente = await MeGusta.findOne({
            where: { idPublicacion, idUsuario }
        })

        if (meGustaExistente) {
            // Si ya existe lo elimina
            await meGustaExistente.destroy()
        } else {
            // Si no existe lo crea
            await MeGusta.create({ idPublicacion, idUsuario })
        }

        res.redirect(`/publicacion/${idPublicacion}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/publicacion/${idPublicacion}`)
    }
}
//Dejar una valorizacion a la publicacion de 1 a 5 estrellas
export async function postValoracion(req, res) {
    console.log('PARAMS:', req.params)
    console.log('ID:', req.params.id)
    const idPublicacion = req.params.id
    const idUsuario = req.session.Usuario.id
    const { puntuacion } = req.body
    const puntuacionInt = parseInt(puntuacion) //Lo convierto a numero

    try {
        const publicacion = await Publicacion.findByPk(idPublicacion)

        if (!publicacion) {
            return res.redirect('/publicacion')
        }

        // No puede valorar su propia publicacion
        if (publicacion.idUsuario === idUsuario) {
            return res.redirect(`/publicacion/${idPublicacion}`)
        }

        // Verificar si ya valoró
        const valoracionExistente = await Valoracion.findOne({
            where: { idPublicacion, idUsuario }
        })

        if (valoracionExistente) {
            // Si ya valoró, actualiza la puntuacion
            await valoracionExistente.update({ puntuacion: puntuacionInt })
        } else {
            // Si no valoró, crea la valoracion
            await Valoracion.create({ idPublicacion, idUsuario, puntuacion: puntuacionInt })
        }
        console.log('IDPUBLICACION:', publicacionJson.idPublicacion)
        res.redirect(`/publicacion/${idPublicacion}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/publicacion/${idPublicacion}`)
    }
}