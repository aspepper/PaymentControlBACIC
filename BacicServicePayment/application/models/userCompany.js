import Sequelize from 'sequelize';
import Database from '../lib/db';

class UserCompanyModel{

    constructor(){
        this.model = Database.define('USERCOMPANIES', {
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CompanyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CreatedDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            CreatedUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
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

        this.model.removeAttribute('id');
    }

}
export default new UserCompanyModel().model;