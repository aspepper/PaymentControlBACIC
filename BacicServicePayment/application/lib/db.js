import Sequelize from 'sequelize';
import dotenv from 'dotenv/config.js';

class Database {

    constructor() {

        // console.log(process.env.DB_NAME);
        // console.log(process.env.DB_USER);
        // console.log(process.env.DB_HOST);
        // console.log(process.env.DB_PASSWORD);

        const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
        const dbUser = process.env.DB_USER;
        const dbHost = process.env.DB_HOST;
        const dbPassword = process.env.DB_PASSWORD;

        this.connection = new Sequelize(dbName, dbUser, dbPassword, 
            {dialect: 'mysql', host: dbHost, query: {raw: true}});

    }
}
export default new Database().connection;