import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";
import Publicacion from "./Publicacion.js";
import Comentario from "./Comentario.js";

class PublicacionComentario extends Model {}

PublicacionComentario.init(
    {
        idPublicacion: {
            type: DataTypes.INTEGER,
            references: {
                model: Publicacion,
                key: 'idPublicacion'
            }
        },
        idComentario: {
            type: DataTypes.INTEGER,
            references: {
                model: Comentario,
                key: 'idComentario'
            }
        }
    },
    {
        sequelize,
        modelName: "PublicacionComentario",
    }
);

export default PublicacionComentario