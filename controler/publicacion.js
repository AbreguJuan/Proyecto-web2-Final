import { Usuario } from '../modelos/tablas/Usuario.js'
import { Publicacion } from '../modelos/tablas/Publicacion.js'
import { Imagen } from '../modelos/tablas/Imagen.js'
import { Etiqueta } from '../modelos/tablas/Etiqueta.js'
import { Comentario } from '../modelos/tablas/Comentario.js'
import { MeGusta } from '../modelos/tablas/MeGusta.js'
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
                    include: [{ model: Usuario }]  //Para mostrar quién comentó
                }
            ]
        })

        if (!publicacion) {
            return res.redirect('/publicacion')
        }

        const publicacionJson = publicacion.toJSON()
        publicacionJson.Imagens = publicacionJson.Imagens.map(img => ({
            ...img,
            src: `${img.metadata},${Buffer.from(img.contenido).toString('base64')}`
        }))

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
                { model: Comentario }
            ],
            order: [['createdAt', 'DESC']]
        })
        //me trae las imagenes guardadas en binario y las convierte a base 64
        const publicacionesConImagenes = publicaciones.map(post => {
            const postJson = post.toJSON()
            postJson.Imagens = postJson.Imagens.map(img => ({
                ...img,
                src: `${img.metadata},${Buffer.from(img.contenido).toString('base64')}`
            }))
            return postJson
        })
        //Renderiza la publicacion con cada imagen
        res.render('publicacion/publicacion', { Publicacion: publicacionesConImagenes })
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
                {
                    model: Usuario, as: 'Autor',
                    required: false
                },
                { model: Imagen },
                {
                    model: Etiqueta,
                    required: false
                },
                { model: Comentario }
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
        res.render('publicacion/publicacion', { Publicacion: publicacionesConImagenes })
    } catch (error) {
        console.log(error)
        res.redirect('/publicacion')
    }
}