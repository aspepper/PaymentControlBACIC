import bcrypt from 'bcrypt';
import userModel from '../models/user';
import user from '../entities/user';
import userRolesModel from '../models/userRole';
import userRole from '../entities/userRole'

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
                return record.dataValues.Id;
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
                                    return record;
                                });

        if(userFind){
            userReturn.id = userFind.Id;
            userReturn.userName = userFind.UserName;
            userReturn.password = userFind.Password;
            userReturn.name = userFind.Name;
            userReturn.document = userFind.Document;
            userReturn.email = userFind.Email;
            userReturn.mobile = userFind.Mobile;
            return userReturn;
        }

        return null;
    }

    async getById(userId: number): user {

        var userReturn = new user(); 
        const userFind = await userModel
                                .findById(userId)
                                .then(function(record){
                                    if (record != null){
                                        userReturn.id = record.Id;
                                        userReturn.userName = record.UserName;
                                        userReturn.password = record.Password;
                                        userReturn.name = record.Name;
                                        userReturn.document = record.Document;
                                        userReturn.email = record.Email;
                                        userReturn.mobile = record.Mobile;
                                        return record;
                                    }
                                    return null;
                                });

        return userFind;
    }

    async getAll(): userModel[] {
        return await userModel.findAll().then((r) => { return r; });
    }

    async getRoles(userId: number): userRole[] {
        const roles = await userRolesModel.findAll({
            where: {
                UserId: userId
            }
        }).then( r => { return r; });

        const userListRoles = roles.map( r => { return r; });
        
        return userListRoles;
    }

}
export default new UserRepository();