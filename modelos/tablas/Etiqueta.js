import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";

class Etiqueta extends Model {}

Etiqueta.init(
    {
        idEtiqueta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        etiqueta: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Etiqueta",
        createdAt: true,
        updatedAt: false
    }
);

export default Etiqueta