import companyModel from '../models/company';
import company from '../entities/company';
import companyTypeModel from '../models/companyType';

class CompanyRepository {

    constructor(){
        this.model = companyModel;
    }

    async create(rec: company): number {

        const Id = await companyModel.create({
            CompanyTypeId: rec.companyType,
            CompanyId: rec.companyId,
            Name: rec.name,
            CNPJ: rec.cnpj
        }).then(function (record) {
            if (record) {
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

    async getAllByType(companyTypeId: number): company[] {

        const returnList = [];
        const CompanyFound = await companyModel
                                    .findAll({ where : { CompanyTypeId : companyTypeId} })
                                    .then(function(companyList) {
                                        for (let i=0; i < companyList.length; i++) {
                                            const companyReturn = new company();
                                            companyReturn.id = companyList[i].Id;
                                            companyReturn.companyTypeId = companyList[i].CompanyTypeId;
                                            companyReturn.companyTypeName = companyList[i].companyTypeName;
                                            companyReturn.companyId = companyList[i].CompanyId;
                                            companyReturn.name = companyList[i].Name;
                                            companyReturn.cnpj = companyList[i].CNPJ;
                                            returnList.push(companyReturn)
                                        }
                                        return companyList;
                                    });
                                    
        return CompanyFound;
    }

    async getById(companyId: number): company {

        var companyReturn = new company(); 
        const companyFound = await companyModel
                                    .findOne({ where : { Id: companyId }})
                                    .then(function(record){ return record; });

        if (companyFound) {
            const _companyType = await companyTypeModel
                                        .findOne({where: { Id: companyFound.CompanyTypeId }})
                                        .then(function(record){ return record; });
            companyReturn.id = companyFound.Id;
            companyReturn.companyTypeId = companyFound.CompanyTypeId;
            companyReturn.companyTypeName = _companyType != null ? _companyType.Name : "";
            companyReturn.companyId = companyFound.CompanyId;
            companyReturn.name = companyFound.Name;
            companyReturn.cnpj = companyFound.CNPJ;
            return companyReturn;
        }

        return null;

    }

    async getAll(): company[] {
        return await companyTypeModel.findAll();
    }

}
export default new CompanyRepository();