import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Publicacion from "./Publicacion.js";
import Imagen from "./Imagen.js";

export class ImagenesPublicacion extends Model {}

ImagenesPublicacion.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
            references: {
                model: Publicacion,
                key: 'idPublicacion'
            }
        },
        idImagen: {
            type: DataTypes.INTEGER,
            references: {
                model: Imagen,
                key: 'idImagen'
            }
        }
    },
    {
        sequelize,
        modelName: "ImagenesPublicacion",
        tableName: "ImagenesPublicacion",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default ImagenesPublicacion