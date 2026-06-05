import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Usuario from "./Usuario.js";
import Publicacion from "./Publicacion.js";
import Comentario from "./Comentario.js";

export class Denuncia extends Model { }

Denuncia.init(
    {
        idDenuncia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
        idPublicacion: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Publicacion,
                key: 'idPublicacion'
            }
        },
        idComentario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Comentario,
                key: 'idComentario'
            }
        }
    },
    {
        sequelize,
        modelName: "Denuncia",
        tableName: "Denuncia",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default Denuncia