import Sequelize from 'sequelize';
import Database from '../lib/db';

class UserRoleModel{

    constructor(){
        this.userRole = Database.define('USERROLES', {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            RoleId: {
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
    }

}
export default new UserRoleModel().userRole;