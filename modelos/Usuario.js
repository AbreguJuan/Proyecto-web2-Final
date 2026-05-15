import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        birthDate: {
            type: DataTypes.DATEONLY
        },
        phone: {
            type: DataTypes.STRING(20)
        }
    }, {
        sequelize, //necesario para la coneccion a la base de datos
        modelName: 'User', //nombre del modelo en JavaScript
        //tableName: 'usuarios', //nombre de la tabla en la base de datos
        createdAt: true, //cada vez que cree un usuario coloca la fecha de creacion
        deletedAt: true, //cada vez que borre un usuario coloca la fecha de eliminacion
    }
);

export default User

// user
// id not null auto increment
// firstname not null varchar(50)
// lastName not null varchar(50)
// birthDate date
// email not null varchar(100) unique
// phone varchar(20)
// -- auditoria
// createdAt
// updatedAt
// deletedAt
