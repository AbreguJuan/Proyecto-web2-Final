//"Agrego datos de ejemplo a la base de datos

import sequelize from "../modelos/config.js";
import Usuario from "../modelos/tablas/Usuario.js";

async function seedUsuario() {
    await sequelize.sync({alter: true})

    await Usuario.bulkCreate([
        { 
            username: "Admin",
            password: "admin123", 
            email: "admin@example.com",
        },
        { 
            username: "Userone",
            password: "userone123", 
            email: "userone@example.com",
        },
        { 
            username: "Usertwo",
            password: "usertwo123", 
            email: "usertwo@example.com",
        },
        { 
            username: "Ana",
            password: "ana123",
            email: "ana@example.com",
        },
        { 
            username: "Luis",
            password: "luis123", 
            email: "luis@example.com",
        }
    ]);
}

//seedUsuario(); //Agregado

//Seguir creando otras funciones para llenar la tabla