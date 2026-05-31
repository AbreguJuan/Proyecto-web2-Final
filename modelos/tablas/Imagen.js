import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";

export class Imagen extends Model {}

Imagen.init(
    {
        idImagen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contenido: {
            type: DataTypes.BLOB
        },
        copyright: {
            type: DataTypes.BOOLEAN
        },
        watermark: {
            type: DataTypes.BOOLEAN
        },
        metadata: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Imagen",
        tableName: "Imagen",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default Imagen