//Prueba para verificar la coneccion a la base de datos
import 'dotenv/config'
import {Sequelize} from 'sequelize'

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

//Testea la coneccion a la base de datos
/*try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}*/

export default sequelize