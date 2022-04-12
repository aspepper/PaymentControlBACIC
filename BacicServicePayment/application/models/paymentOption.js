import Sequelize from 'sequelize';
import Database from '../lib/db';

class PaymentOptionModel{

    constructor(){
        this.paymentOption = Database.define('PAYMENT_OPTIONS', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Fee: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                default: 0
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
export default new PaymentOptionModel().paymentOption;