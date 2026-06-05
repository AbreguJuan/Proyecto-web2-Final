import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Imagen from "./Imagen.js";
import Coleccion from "./Coleccion.js";

export class ColeccionImagenes extends Model { }

ColeccionImagenes.init(
    {
        idColeccion: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Coleccion',
                key: 'idColeccion'
            }
        },
        idImagen: {
            type: DataTypes.INTEGER,
            references: {
                model: Imagen,
                key: 'idImagen'
            }
        },
    },
    {
        sequelize,
        modelName: "ColeccionImagenes",
        tableName: "ColeccionImagenes",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default ColeccionImagenes