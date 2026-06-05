import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Publicacion from "./Publicacion.js";
import Coleccion from "./Coleccion.js";

export class ColeccionPublicaciones extends Model { }

ColeccionPublicaciones.init(
    {
        idColeccion: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Coleccion',
                key: 'idColeccion'
            }
        },
        idPublicacion: {
            type: DataTypes.INTEGER,
            references: {
                model: Publicacion,
                key: 'idPublicacion'
            }
        },
    },
    {
        sequelize,
        modelName: "ColeccionPublicaciones",
        tableName: "ColeccionPublicaciones",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default ColeccionPublicaciones