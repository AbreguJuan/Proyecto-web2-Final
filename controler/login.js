import { Usuario } from '../modelos/tablas/Usuario.js'

//Entra a la pagina de Ingresar Usuario
export async function ingresarFormulario(req, res) {
    res.render('login/ingresar')
}

//Procesa el formulario de Ingresar Usuario
export async function ingresarUsuario(req, res) {
    //Obtiene los datos del formulario
    const { email, password } = req.body
    //Elimina los espacios en blanco al inicio y al final de los datos
    const mail = email.trim()
    const pass = password.trim()
    //Validacion de campos vacios
    if (!mail || !pass) {
        res.status(400).render('login/ingresar', {
            alert: {
                status: "error",
                text: "Por favor, ingrese su correo electrónico y contraseña"
            },
            formValues: req.body
        })
        console.log('Campos vacíos o faltan completaro algun campo') //solo lo puedo ver yo
        return 
    }

    try {

        const usuarioEncontrado = await Usuario.findOne({ 
            where: { 
                email: mail,
                password: pass
            } 
        })
        if (!usuarioEncontrado) {
            return res.status(401).render('login/ingresar', { 
                alert: {
                    status: "error",
                    text: "Correo electrónico o contraseña incorrectos"
                },
                formValues: req.body
            })
            console.log('Usuario no encontrado') //solo lo puedo ver yo
            return
        }

        /*const isValidated = await usuarioEncontrado.validatePassword(pass)
        if (!isValidated) {
            return res.status(401).render('login/ingresar', { 
                alert: {
                    status: "error",
                    text: "Correo electrónico o contraseña incorrectos"
                },
                formValues: req.body
            })
            return
        }*/
        //Si el usuario es encontrado y la contraseña es correcta => crea la sesion del usuario
        /*req.session.Usuario = {
            id: usuarioEncontrado.id,
        }*/ //ultimo video mirar

    } catch (error) {
        console.error(error)
        return res.status(500).render('login/ingresar', { 
            alert: {
                status: "error",
                text: "Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde."
            },
            formValues: req.body
        })
        return
    }

    //Si esta todo ok => redirecciona a la pagina de inicio
    res.redirect('/usuario')
}

export async function registrarseFormulario(req, res) {
    res.render('login/registrarse')
}

export async function registrarseUsuario(req, res) {

}

export async function cerrarSesion(req, res) {
    res.redirect('/login')
}
