import userRepository from './repository/user';
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = userRepository.getById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use('local-login', new LocalStrategy(
        function (username, password, done) {

            console.log("Passing by Authentication LocalStrategy");
            console.log(username);
            console.log(password);

            const user = userRepository.get(username);

            // usuário inexistente
            if (!user) { return done(null, false, {"message": "User not found."}) }

            // comparando as senhas
            if (!userRepository.authentication(username, password)) { return done(null, false); }
            
            return done(null, user)
        })
    );
}
