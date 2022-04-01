import Sequelize from 'sequelize';
import Database from '../lib/db';

class UserModel{

    constructor(){
        this.user = Database.define('USERS', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            UserName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Document: {
                type: Sequelize.STRING,
                allowNull: true
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Mobile: {
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
export default new UserModel().user;