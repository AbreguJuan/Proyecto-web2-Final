import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Publicacion from "./Publicacion.js";
import Etiqueta from "./Etiqueta.js";

class PublicacionEtiqueta extends Model {}

PublicacionEtiqueta.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
            references: {
                model: Publicacion,
                key: 'idPublicacion'
            }
        },
        idEtiqueta: {
            type: DataTypes.INTEGER,
            references: {
                model: Etiqueta,
                key: 'idEtiqueta'
            }
        }
    },
    {
        sequelize,
        modelName: "PublicacionEtiqueta",
        tableName: "PublicacionEtiqueta",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default PublicacionEtiqueta