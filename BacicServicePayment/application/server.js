import app from './lib/app';
import userDB from './model/User';
import user from './entities/user';
import userRepository from './repository/user';

// var rec = new user();
// rec.password = 'teste';
// rec.userName = 'alex';
// rec.name = 'Alexsandro Pimenta';
// rec.document = '12139836812';
// userRepository.create(rec);

app.listen(3333, function () {
    console.log('Node app is running on port 3333');
});
