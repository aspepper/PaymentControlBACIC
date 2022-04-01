import bcrypt from 'bcrypt';
import model from '../models/userRole';
import userRole from '../entities/userRole';

class UserRepository {

    constructor(){
        this.model = model;
    }

    async create(rec: userRole): number {

        const Id = await model.create({
            UserId: rec.userId,
            RoleId: rec.roleId
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
            console.log (err);
            return null;
        }); 

        return Id;
    }

    async getAll(){
        const recordReturn = await model.findAll();
        console.log(recordReturn);
        return recordReturn;
    }

}
export default new UserRepository();