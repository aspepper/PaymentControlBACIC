import express from 'express';
import { check, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import passport from'passport';
import session from 'express-session';
import path from 'path';

import routerDashboard from './application/routes/dashboard';
import routerUser from './application/routes/user';
import routerForward from './application/routes/forward_agent';

import userRepo from './application/repository/user';
import userRole from './application/repository/userRole';
import userEntity from './application/entities/user';
import userRoleEntity from './application/entities/userRole';
import User from './application/entities/user';

const app = express();

/* Caso não tenho o usuário admin, cria o admin com senha padrão admin */
const userAdmin = userRepo.get('admin');
userAdmin.then(function(found) { 
    if (found == null) {
        const record = new userEntity();
        record.userName = 'admin';
        record.password = 'admin';
        record.name = 'Administrator';
        record.email = 'aspepper@gmail.com';
        record.mobile = '13991206178';
        const userId = userRepo.create(record);

        if (userId != null ) {
            const recordUR = new userRoleEntity();
            recordUR.userId = parseInt(userId);
            recordUR.roleId = 1; // Administrator Geral
            userRole.create(recordUR);
        }
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
        user.then(function(_user) {
            if (!_user) { return done(null, false, {"message": "Acesso não autenticado."}); }
            bcrypt.compare(password, _user.Password, (err, isValid) => {
              if (err) {
                return done(null, false, err)
              }
              if (!isValid) {
                return done(null, false, {message: "Acesso não autorizado"})
              }
              return done(null, user)
            })
        });

    }
));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({  
  secret: 'OrdNaXel4detr4vnIYmeMaNTsRiF', //configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } //30min
}))
app.use(passport.initialize());
app.use(passport.session());

// route middleware to ensure user is logged in
function authenticationMiddleware(req, res, next) {
    let _isAuthenticated = req.isAuthenticated();
    console.log("authenticatedMiddleware");
    console.log(_isAuthenticated);

    if (req.isAuthenticated()){ return next(); }
    res.redirect("/login")
}

app.use('/public', express.static(path.join(__dirname, 'application/public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/application/views'));
app.set('view engine', 'pug');

//app.use("/login", routerLogin);

app.get('/login', function(req, res, next) {
    console.log("entramos no get");
    if (req.query.fail)
    res.render('login', { title: 'Usuário', message: 'Usuário e/ou senha incorretos!' });
      else
    res.render('login', { title: 'Usuário', message: null });
  });
  
// app.post("/login", 
//   passport.authenticate("local", { failureRedirect: "/login"}),
//   function (req, res) {
//       res.redirect("/dashboard");
// }); 

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
app.use("/user", authenticationMiddleware, routerUser);
app.use("/forward_agent", authenticationMiddleware, routerForward);

app.get("/logout", function (req, res) {
    req.logout();
    res.send("logout success!");
});

// app.use(function(req, res, next) {
//     next(createError(404));
// });
 
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
