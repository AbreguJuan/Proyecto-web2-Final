import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import bcrypt from 'bcrypt'

export class Usuario extends Model {
    //Valida el password del login
    async validatePassword(password) {
        return await bcrypt.compare(password, this.password)
    }
}

Usuario.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'unique_username'
            }
        },
        firstName: {
            type: DataTypes.STRING(50),
        },
        lastName: {
            type: DataTypes.STRING(50),
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_email' 
            }
        },
        birthDate: {
            type: DataTypes.DATEONLY
        },
        phone: {
            type: DataTypes.STRING(20)
        },
        avatar: {
            type: DataTypes.BLOB
        }
    }, {
    sequelize, //necesario para la coneccion a la base de datos
    modelName: 'Usuario', //nombre del modelo en JavaScript
    tableName: 'Usuarios', //nombre de la tabla en la base de datos
    createdAt: true, //cada vez que cree un usuario coloca la fecha de creacion
    deletedAt: true, //cada vez que borre un usuario coloca la fecha de eliminacion
    updatedAt: false, //cada vez que actualice un usuario coloca la fecha de actualizacion
    //Para encriptar la password
    hooks: {
        beforeSave: async (usuario) => {
            if (usuario.password && usuario.changed('password')) {
                const salt = await bcrypt.genSalt(10)
                const passwordEncriptada = await bcrypt.hash(usuario.password, salt)
                usuario.password = passwordEncriptada
            }
        }
    }
}
);

export default Usuario

