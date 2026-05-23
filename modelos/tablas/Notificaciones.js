import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";
import Usuario from "./Usuario.js";
import Publicacion from "./Publicacion.js";
import Seguidores from "./Seguidores.js";
import Comentario from "./Comentario.js";

class Notificaciones extends Model { }

Notificaciones.init(
    {
        idNotificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        idSeguidores: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Seguidores,
                key: 'idSeguidor'
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        visto: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "Notificaciones",
        tableName: "Notificaciones",
        createdAt: true,
        deletedAt: true,
        updatedAt: false
    }
);

export default Notificaciones