import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";
import Publicacion from "./Publicacion.js";
import Usuario from "./Usuario.js";

class MeGusta extends Model {}

MeGusta.init(
    {
        idMeGusta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPublicacion: {
            type: DataTypes.INTEGER,
            references: {
                model: Publicacion,
                key: 'idPublicacion'
            }
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        }
    },
    {
        sequelize,
        modelName: "MeGusta",
    }
);

export default MeGusta