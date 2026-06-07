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
        return
    }

    try {
        //Busca usuario por email
        const usuarioEncontrado = await Usuario.findOne({
            where: {
                email: mail
            }
        })
        //Si no existe el usuario
        if (!usuarioEncontrado) {
            return res.status(400).render('login/ingresar', {
                alert: {
                    status: "error",
                    text: "Correo electrónico o contraseña incorrectos"
                },
                //manda devuelta los datos en caso de error
                formValues: req.body
            })
            return
        }
        //Validar la contraseña con bcrypt
        const isValidated = await usuarioEncontrado.validatePassword(pass)

        if (!isValidated) {
            return res.status(400).render('login/ingresar', { 
                alert: {
                    status: "error",
                    text: "Correo electrónico o contraseña incorrectos"
                },
                //manda devuelta los datos en caso de error
                formValues: req.body
            })
            return
        }
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
            //manda devuelta los datos en caso de error
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
    const { username, email, password, confirmPassword } = req.body

    const usernameT = username.trim()
    const mail = email.trim()
    const pass = password.trim()
    const confirmPass = confirmPassword.trim()

    if (!usernameT || !mail || !pass || !confirmPass) {
        return res.status(400).render('login/registrarse', { 
            alert: { 
                status: 'error', 
                text: 'Todos los campos son obligatorios' 
            },
            //manda devuelta los datos en caso de error
            formValues: req.body 
        })
    }

    if (pass != confirmPass) {
        return res.status(400).render('login/registrarse', { 
            alert: { 
                status: 'error', 
                text: 'Las contraseñas no coinciden' 
            },
            //manda devuelta los datos en caso de error
            formValues: req.body 
        })
    }

    try {
        const user = await Usuario.create({
            username: username,
            email: mail,
            password: pass
        })
        //Si todo sale bien me redirige al menu principal
        res.redirect('/')
    } catch (error) {
        return res.status(500).render('login/registrarse', { 
            alert: { 
                status: 'error', 
                text: 'Error al registrar usuario'
            },
            //manda devuelta los datos en caso de error
            formValues: req.body 
        })
    }
}

export async function cerrarSesion(req, res) {
    res.redirect('/login')
}
