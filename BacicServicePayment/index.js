import express from 'express';
import { check, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import passport from'passport';
import session from 'express-session';
import path from 'path';

import routerDashboard from './application/routes/dashboard';
import routerUser from './application/routes/user';
import routerRevenue from './application/routes/revenue';
import routerCharges from './application/routes/charges';
import routerYield from './application/routes/yield';
import routerForward from './application/routes/forward_agent';

import userRepo from './application/repository/user';
import userRoleRepo from './application/repository/userRole';
import userCompanyRepo from './application/repository/userCompany';
import userEntity from './application/entities/user';
import userRoleEntity from './application/entities/userRole';
import userCompanyEntity from './application/entities/userCompany';

const app = express();

/* Caso não tenho o usuário admin, cria o admin com senha padrão admin */
const userAdmin = userRepo.get('admin');
userAdmin.then(function(found) { 
    if (!found) {
        const record = new userEntity();
        record.userName = 'admin';
        record.password = 'admin';
        record.name = 'Administrator';
        record.email = 'aspepper@gmail.com';
        record.mobile = '13991206178';

        var userCreation = userRepo.create(record);

        userCreation.then(function(userId) { 
          if (userId) {
              var recordUR = new userRoleEntity();
              recordUR.userId = parseInt(userId);
              recordUR.roleId = 1; // Administrator Geral
              userRoleRepo.create(recordUR);

              var recordUC = new userCompanyEntity();
              recordUC.userId = parseInt(userId);
              recordUC.companyId = 1; // Empresa BASIC
              userCompanyRepo.create(recordUC);
          }
        });
    }
});


//require('./auth')(passport);

const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
 
passport.use(new LocalStrategy(
    function (username, password, done) {
        const user = userRepo.get(username);
        user.then(function(found) { 
            if (!found) { return done(null, false, {"message": "Acesso não autenticado."}); }
            bcrypt.compare(password, found.password, (err, isValid) => {
                if (err) {
                  return done(null, false, err)
                }
                if (!isValid) {
                  return done(null, false, {message: "Acesso não autorizado"})
                }
                return done(null, found);
            });
        });
    }
));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({  
  secret: 'OrdNaXel4detr4vnIYmeMaNTsRiF', //configure um segredo seu aqui,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }, //30min
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// route middleware to ensure user is logged in
function authenticationMiddleware(req, res, next) {
    let _isAuthenticated = req.isAuthenticated();
    if (req.isAuthenticated()){ return next(); }
    res.redirect("/login")
}

app.use('/public', express.static(path.join(__dirname, 'application/public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/application/views'));
app.set('view engine', 'pug');

app.get('/login', function(req, res, next) {
    if (req.query.fail)
    res.render('login', { title: 'Login', message: 'Usuário e/ou senha incorretos!', currentPath: '/login' });
      else
    res.render('login', { title: 'Login', message: null, currentPath: '/login' });
  });

app.post('/login',
  [
    check('UserName')
      .isLength({ min: 3 })
      .withMessage('Informe o Usuário'),
    check('Password')
      .isLength({ min: 3 })
      .withMessage('Informe a Senha'),
  ],
  passport.authenticate("local", { failureRedirect: "/login?fail=true"}),
  function(req, res) {
    res.redirect("/dashboard");
  });

app.use("/", authenticationMiddleware, routerDashboard);
app.use("/home", authenticationMiddleware, routerDashboard);
app.use("/dashboard", authenticationMiddleware, routerDashboard);
app.use("/charges", authenticationMiddleware, routerCharges);
app.use("/yield", authenticationMiddleware, routerYield);
app.use("/revenues", authenticationMiddleware, routerRevenue);
app.use("/user", authenticationMiddleware, routerUser);
app.use("/forward_agent", authenticationMiddleware, routerForward);

app.get("/logout", function (req, res) {
    req.logout();
    res.send("logout success!");
});

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
