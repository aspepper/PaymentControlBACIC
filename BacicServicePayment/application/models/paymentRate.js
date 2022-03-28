import Sequelize from 'sequelize';
import Database from '../lib/db';

class PaymentRateModel{

    constructor(){
        this.paymentRate = Database.define('PAYMENT_RATE', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            CompanyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            PaymentCommission: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                default: 0
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
export default new PaymentRateModel().paymentRate;