import { Usuario } from '../modelos/tablas/Usuario.js'
import { Publicacion } from '../modelos/tablas/Publicacion.js'
import { Imagen } from '../modelos/tablas/Imagen.js'
import { Etiqueta } from '../modelos/tablas/Etiqueta.js'
import { Comentario } from '../modelos/tablas/Comentario.js'
import { MeGusta } from '../modelos/tablas/MeGusta.js'
import usuarioRouter from '../routes/usuario.js'

export async function mostrarPublicaciones(req, res) {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [Imagen, Etiqueta, Usuario, Comentario]
        })
        res.render('publicacion/publicacion', { Publicacion: publicaciones })
    } catch (error) {
        console.log(error)
    }
}

export async function getCrearPublicacion(req, res) {
    res.render('publicacion/crearPublicacion')
}

export const postCrearPublicaion = async (req, res) => {
    console.log("req.body: ", req.body)
    const { titulo, contenido, img, etiqueta } = req.body;
    //Datos para obtener al usuario y mandarlo al pug
    const idUsuario = 1 //aca tengo que cambiarlo por session
    include: [{ model: Usuario }]

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
                await post.addImagen(imagenCreada)
            }
        }
        //Si todo anda bien, me redirige al menu
        res.redirect('/publicacion')
        
    } catch (error) {
        console.log(error)
        res.redirect('/publicacion/crearPublicacion')
    }
}