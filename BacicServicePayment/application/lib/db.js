import mysql from 'mysql';

class Database {

    constructor(){
        this.connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'L0g1t3ch@1972',
            database:'bacic_service_payment'
        });

    }
}
export default new Database().connection;