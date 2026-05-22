import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Usuario from "./Usuario.js";

class Mensajes extends Model { }

Mensajes.init(
    {
        idMensaje: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuarioEmisor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
        idUsuarioReceptor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
        chat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize, //necesario para la coneccion a la base de datos
        modelName: 'Mensajes', //nombre del modelo en JavaScript
        createdAt: true, //cada vez que cree un mensaje coloca la fecha de creacion
        deletedAt: true, //cada vez que borre un mensaje coloca la fecha de eliminacion
    }
);

export default Mensajes