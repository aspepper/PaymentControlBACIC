import bcrypt from 'bcrypt';
import userModel from '../models/user';
import user from '../entities/user';

class UserRepository {

    constructor(){
        this.model = userModel;
    }

    async create(rec: user): number {

        const salt = await bcrypt.genSalt(10);
        rec.password = await bcrypt.hash(rec.password, salt);

        const Id = await userModel.create({
            UserName: rec.userName,
            Password: rec.password,
            Name: rec.name,
            Document: rec.document,
            Email: rec.email,
            Mobile: rec.mobile
        }).then(function (record) {
            if (record) {
                console.log(record);
                return record["dataValues"]["Id"];
            } else {
                console.log('Error in insert new record');
            }
            return null
        })
        .catch(function(err){
            console.log(err);
            return null;
        }); 

        return Id;
    }

    async get(username: string): user {

        var userReturn = new user(); 

        const userFind = await userModel
                                .findOne({ where: { userName: username } })
                                .then(function(record){
                                    if (record != null){
                                        console.log("findOne")
                                        userReturn.id = record.Id;
                                        userReturn.userName = record.UserName;
                                        userReturn.password = record.Password;
                                        userReturn.name = record.Name;
                                        userReturn.document = record.Document;
                                        userReturn.email = record.Email;
                                        userReturn.mobile = record.Mobile;
                                        console.log(userReturn);
                                        return record;
                                    }
                                    return null;
                                });

        return userFind;

    }

    async getAll(): userModel[] {
        return await userModel.findAll();
    }

}
export default new UserRepository();