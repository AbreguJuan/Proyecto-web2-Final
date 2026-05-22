import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

class Usuario extends Model {}

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
            unique: true
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        birthDate: {
            type: DataTypes.DATEONLY
        },
        phone: {
            type: DataTypes.STRING(20)
        }
    }, {
        sequelize, //necesario para la coneccion a la base de datos
        modelName: 'Usuario', //nombre del modelo en JavaScript
        //tableName: 'usuarios', //nombre de la tabla en la base de datos
        createdAt: true, //cada vez que cree un usuario coloca la fecha de creacion
        deletedAt: true, //cada vez que borre un usuario coloca la fecha de eliminacion
    }
);

export default Usuario

