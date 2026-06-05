import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";

export class Publicacion extends Model {}

Publicacion.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "Publicacion",
        tableName: "Publicacion",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default Publicacion