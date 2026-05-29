import { Usuario } from '../modelos/tablas/Usuario.js'

//Entra a la pagina de Ingresar Usuario
export async function ingresarFormulario(req, res) {
    res.render('login/ingresar')
}

//Procesa el formulario de Ingresar Usuario
export async function ingresarUsuario(req, res) {
    const { email, password } = req.body
    /*const mail = email.trim()
    const pass = password.trim()
    //Validacion de campos vacios
    if (!mail || !pass) {
        return res.status(400).render('login/ingresar', { W
            alert: {
                status: "error",
                text: "Por favor, ingrese su correo electrónico y contraseña"
            },
            formValues: req.body
        })
        return
    }*/

    try {

        const usuarioEncontrado = await Usuario.findOne({ 
            where: { 
                email: mail 
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
            return
        }

        const isValidated = await usuarioEncontrado.validatePassword(pass)
        if (!isValidated) {
            return res.status(401).render('login/ingresar', { 
                alert: {
                    status: "error",
                    text: "Correo electrónico o contraseña incorrectos"
                },
                formValues: req.body
            })
            return
        }

        req.session.user = {
            id: usuarioEncontrado.id,
        }
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