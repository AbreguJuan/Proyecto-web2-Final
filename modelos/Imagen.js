import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

class Imagen extends Model {}

Imagen.init(
    {
        idImagen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imagen: {
            type: DataTypes.BLOB
        },
        copyright: {
            type: DataTypes.BOOLEAN
        },
        watermark: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: "Imagen",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default Imagen