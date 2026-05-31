import { Router } from "express"
import { Imagen } from '../modelos/tablas/Imagen.js'

const imagenRouter = Router()

//Coleccion
imagenRouter.get('/img', (req, res) => {
    res.render('imagen/indexImagen')
})

imagenRouter.get('/gallery', async (req, res) => {
    const files = await Imagen.findAll();
    const arregloImagenes = []
    for (const imagen of files) {
        const imgBase64 = imagen.contenido.toString('base64')
        const sufix = `data:image/${imagen.metadata};base64,`
        arregloImagenes.push({
            name: imagen.titulo,
            src: sufix + imgBase64
        })
    }
    res.render('imagen/view', {
        imagenes: arregloImagenes
    })
})

imagenRouter.post('/img', async (req, res) => {
    const imagenes = req.body.imgs

    for (const img of imagenes) {
        const textBase64 = img.src

        const arregloBase64 = textBase64.split(',')
        const imgBuffer = Buffer.from(arregloBase64[1], 'base64')

        await Imagen.create({
            contenido: imgBuffer,
            titulo: req.body.imgs[0].name,
            metadata: arregloBase64[0]
        })
    }
    //Conversion para guardar en db
    res.redirect('/gallery')
})

export default imagenRouter