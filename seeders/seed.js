//"Agrego datos de ejemplo a la base de datos

import sequelize from "../modelos/config.js";
import Usuario from "../modelos/tablas/Usuario.js";

async function seedUsuario() {
    await sequelize.sync({alter: true})

    await Usuario.bulkCreate([
        { 
            username: "Juan",
            firstName: "Juan",
            lastName: "Perez",
            password: "password123", 
            email: "juan@example.com",
            birthDate: "1990-01-01",
            phone: "1234567890"
        },
        { 
            username: "Maria",
            firstName: "Maria",
            lastName: "Gomez",
            password: "password456", 
            email: "maria@example.com",
            birthDate: "1992-05-15",
            phone: "0987654321"
        },
        { 
            username: "Pedro",
            firstName: "Pedro",
            lastName: "Lopez",
            password: "password789", 
            email: "pedro@example.com",
            birthDate: "1985-12-10",
            phone: "5555555555"
        },
        { 
            username: "Ana",
            firstName: "Ana",
            lastName: "Rodriguez",
            password: "password012", 
            email: "ana@example.com",
            birthDate: "1995-08-20",
            phone: "1111111111"
        },
        { 
            username: "Luis",
            firstName: "Luis",
            lastName: "Martinez",
            password: "password345", 
            email: "luis@example.com",
            birthDate: "1990-03-25",
            phone: "2222222222"
        }
    ]);
}

//seedUsuario(); //Agregado

//Seguir creando otras funciones para llenar la tabla