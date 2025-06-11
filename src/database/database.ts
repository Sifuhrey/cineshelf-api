import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const dbname = process.env.DBNAME || "default_db";
const dbuser = process.env.DBUSER || "default_user";
const dbpassword = process.env.DBPASSWORD || "default_password";
const database = new Sequelize(dbname, dbuser, dbpassword, {
     host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql"
})

database.authenticate()
    .then(() => console.log("Database connetcted successfully"))
    .catch((error: any) => console.error(`Error creating database: ${error.message}`))

export default database;