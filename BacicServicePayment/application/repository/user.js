import bcrypt from 'bcrypt';
import userModel from '../models/user';
import user from '../entities/user';

class UserRepository {

    constructor(){
        this.model = userModel;
    }

    async create(rec: user){
        const salt = await bcrypt.genSalt(10);
        rec.password = await bcrypt.hash(rec.password, salt);

        const resultado = await userModel.create({
            UserName: rec.userName,
            Password: rec.password,
            Name: rec.name,
            Document: rec.document
        }).then(function (users) {
            if (users) {
                console.log(users);
            } else {
                console.log('Error in insert new record');
            }
            return users
        })
        .catch(function(err){
            return err;
        }); 

        console.log('Resultado do Cadastro');
        console.log(resultado);
    }

    // async getAll(param: String): user {
    //     const record = await userModel.find()

    // }

}
export default new UserRepository();