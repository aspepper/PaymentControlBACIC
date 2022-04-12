import sequelize from 'sequelize';
import moment from 'moment';
import paymentModel from '../models/payments';

class PaymentRepository {

    constructor(){
        this.model = paymentModel;
    }

    // async create(rec: user): number {

    //     const salt = await bcrypt.genSalt(10);
    //     rec.password = await bcrypt.hash(rec.password, salt);

    //     const Id = await userModel.create({
    //         UserName: rec.userName,
    //         Password: rec.password,
    //         Name: rec.name,
    //         Document: rec.document,
    //         Email: rec.email,
    //         Mobile: rec.mobile
    //     }).then(function (record) {
    //         if (record) {
    //             return record.dataValues.Id;
    //         } else {
    //             console.log('Error in insert new record');
    //         }
    //         return null
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //         return null;
    //     }); 
    //     return Id;
    // }

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
        
        return total;

    }

    async getRecepts(companyId: number, days: number): paymentModel[] {
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
        
        return paymentList;
    }

}
export default new PaymentRepository();