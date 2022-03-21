var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'l0g1t3ch',
    database:'bacic_service_payment'
});
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected!:)');
    }
});  
module.exports = connection;