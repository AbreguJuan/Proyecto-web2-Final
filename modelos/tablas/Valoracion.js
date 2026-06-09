import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Publicacion from "./Publicacion.js";
import Usuario from "./Usuario.js";

export class Valoracion extends Model {}

Valoracion.init({
    idValoracion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    idPublicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Valoracion',
    tableName: 'Valoracion',
    createdAt: true,
    updatedAt: false,
    deletedAt: true
})

export default Valoracion