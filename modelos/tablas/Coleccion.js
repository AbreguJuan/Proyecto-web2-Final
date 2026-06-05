import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Usuario from "./Usuario.js";

export class Coleccion extends Model { }

Coleccion.init(
    {
        idColeccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
    },
    {
        sequelize, //necesario para la coneccion a la base de datos
        modelName: 'Coleccion', //nombre del modelo en JavaScript
        tableName: 'Coleccion', //nombre de la tabla en la base de datos
        createdAt: true, //cada vez que cree un seguidor coloca la fecha de creacion
        deletedAt: true, //cada vez que borre un seguidor coloca la fecha de eliminacion
        updatedAt: false
    }
);

export default Coleccion