import Sequelize from 'sequelize';
import Database from '../lib/db';

class PaymentModel{

    constructor(){
        this.model = Database.define('PAYMENTS', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            PaymentOptionId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CompanyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CustomerId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Value: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                default: 0
            },
            PaymentFee: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                default: 0
            },
            Status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                default: 0
            },
            StatusDate: {
                type: Sequelize.DATE,
                allowNull: false,
                default: 0
            },
            CreatedDate: {
                type: Sequelize.DATEONLY,
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
export default new PaymentModel().model;