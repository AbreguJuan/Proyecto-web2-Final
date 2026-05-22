import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";
import Usuario from "./Usuario.js";

class Comentario extends Model {}

Comentario.init(
    {
        idComentario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comentario: {
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
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "Comentario",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default Comentario