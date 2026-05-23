import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Usuario from "./Usuario.js";

class Seguidores extends Model { }

Seguidores.init(
    {
        idSeguidor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
        idUsuarioSeguido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        }
    },
    {
        sequelize, //necesario para la coneccion a la base de datos
        modelName: 'Seguidores', //nombre del modelo en JavaScript
        tableName: 'Seguidores', //nombre de la tabla en la base de datos
        createdAt: true, //cada vez que cree un seguidor coloca la fecha de creacion
        deletedAt: true, //cada vez que borre un seguidor coloca la fecha de eliminacion
        updatedAt: false
    }
);

export default Seguidores