import Sequelize from 'sequelize';
import Database from '../lib/db';

class CompanyModel{

    constructor(){
        this.company = Database.define('COMPANIES', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            CompanyTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CompanyId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ModifiedDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            ModifiedUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            IsDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },{
            timestamps: false
        });
    }

}
export default new CompanyModel().company;