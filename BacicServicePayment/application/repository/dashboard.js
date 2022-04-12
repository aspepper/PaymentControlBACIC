import bcrypt from 'bcrypt';
import userModel from '../models/user';
import user from '../entities/user';
import userRolesModel from '../models/userRole';
import userRole from '../entities/userRole'
import paymentModel from '../models/payments';
import sequelize from 'sequelize';
import moment from 'moment';

class DashboardRepository {

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

    async getTotalReceived(companyId: number, days: number): number {
        var beginDate = moment().subtract(days, 'days').toDate();
        beginDate.setHours(0,0,0,0);
        const Op = sequelize.Op;
        const paymentList = await paymentModel
                                    .findAll({ where : 
                                                    { 
                                                        CompanyId: companyId, 
                                                        CreatedDate: { 
                                                                        [Op.gte]: beginDate 
                                                                     } 
                                                    }
                                    })
                                    .then(function(_paymentList) { return _paymentList; });
        
        const total = paymentList.map(item => item.Value).reduce((prev, curr) => prev + curr, 0);

        return total;

    }

    async getAverageTicket(companyId: number, days: number): number {
        var beginDate = moment().subtract(days, 'days').toDate();
        beginDate.setHours(0,0,0,0);
        const Op = sequelize.Op;
        const paymentList = await paymentModel
                                    .findAll({ where : 
                                                    { 
                                                        CompanyId: companyId, 
                                                        CreatedDate: { 
                                                                        [Op.gte]: beginDate 
                                                                     } 
                                                    }
                                    })
                                    .then(function(_paymentList) { return _paymentList; });
        
        let total = paymentList.map(item => item.Value).reduce((prev, curr) => prev + curr, 0);
        total = total / paymentList.length;

        return total;

    }

    async getWeekConversion(companyId: number, days: number): number {
        var beginDate = moment().subtract(days, 'days').toDate();
        beginDate.setHours(0,0,0,0);
        const Op = sequelize.Op;
        const paymentAll = await paymentModel
                                    .findAll({ where : 
                                                    { 
                                                        CompanyId: companyId, 
                                                        CreatedDate: { 
                                                                        [Op.gte]: beginDate 
                                                                     } 
                                                    }
                                    })
                                    .then(function(_paymentList) { return _paymentList; });
        const paymentList = await paymentModel
                                    .findAll({ where : 
                                                    { 
                                                        CompanyId: companyId, 
                                                        Status: 2,
                                                        CreatedDate: { 
                                                                        [Op.gte]: beginDate 
                                                                     } 
                                                    }
                                    })
                                    .then(function(_paymentList) { return _paymentList; });
        
        let total = paymentAll.map(item => item.Value).reduce((prev, curr) => prev + curr, 0);
        const convertido = paymentList.map(item => item.Value).reduce((prev, curr) => prev + curr, 0);
        total = (convertido / total) * 100;

        return total;

    }

}
export default new DashboardRepository();