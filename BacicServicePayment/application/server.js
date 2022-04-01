import app from './lib/app';
import bodyParser from 'body-parser';
import homeRouter from './routes/home';
import dashboard from './routes/dashboard';
import express from 'express';
import path from 'path';
import user from './repository/user';
import userRole from './repository/userRole';
import userEntity from './entities/user';
import userRoleEntity from './entities/userRole';

// app.use('/assets',express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use("/", homeRouter);
app.use("/home", homeRouter);
app.use("/dashboard", dashboard);

/* Caso não tenho o usuário admin, cria o admin com senha padrão admin */
const userAdmin = user.get('admin');

userAdmin.then(function(found) { 
    
    if (found == null) {

        const record = new userEntity();
        record.userName = 'admin';
        record.password = 'admin';
        record.name = 'Administrator';
        record.email = 'aspepper@gmail.com';
        record.mobile = '13991206178';
        const userId = user.create(record);

        console.log(userId);
        if (userId != null ) {
            const recordUR = new userRoleEntity();
            recordUR.userId = parseInt(userId);
            recordUR.roleId = 1; // Administrator Geral
            const roleId = userRole.create(recordUR);
        }
    }
});

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
