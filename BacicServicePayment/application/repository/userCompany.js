import model from '../models/userCompany';
import userCompany from '../entities/userCompany';
import companyRepo from './company'
import companyEntity from '../entities/company'; 

class UserCompanyRepository {

    constructor(){
        this.model = model;
    }

    async create(rec: userCompany): Boolean {

        const result = await model.create({
            UserId: rec.userId,
            CompanyId: rec.companyId
        }).then(function (record) {
            if (record) {
                return true;
            } else {
                false;
            }
            return null
        })
        .catch(function(err){
            console.log (err);
            return false;
        }); 

        return result;
    }

    async getByUserId(userId: number): companyEntity {
        const recordReturn = await model
                                    .findOne({where : { UserId : userId} })
                                    .then(function(record) { return record; });
        if (recordReturn){
            const company = await companyRepo.getById(recordReturn.CompanyId);
            if (company) { return company; }
            return null;
        }
        return null;
    }

    async getAll(){
        const recordReturn = await model.findAll();
        console.log(recordReturn);
        return recordReturn;
    }

}
export default new UserCompanyRepository();