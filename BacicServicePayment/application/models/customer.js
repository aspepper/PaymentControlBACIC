import Sequelize from 'sequelize';
import Database from '../lib/db';

class CustomerModel {

    constructor(){
        this.model = Database.define('CUSTOMERS', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            PersonType: {
                type: Sequelize.CHAR,
                allowNull: false
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            Document: {
                type: Sequelize.STRING,
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
    }

}
export default new CustomerModel().model;