module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Users', {
      'id': {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      'username': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'password': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'name': {
        type: DataTypes.STRING,
        allowNull: false
      },
      'aNumber': {
        type: DataTypes.STRING,
        allowNull: true
      },
      'document': {
        type: DataTypes.STRING,
        allowNull: true
      },
      'createdDate': {
        type: DataTypes.DATE,
        allowNull: false
      },
      'createdUserId': {
        type: DataTypes.DATE,
        allowNull: false
      },
      'createdDate': {
        type: DataTypes.DATE,
        allowNull: false
      },
      'createdUserId': {
        type: DataTypes.DATE,
        allowNull: false
      },
      'isDeleted': {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: '0'
      }
    }, {
      tableName: 'Users',
      freezeTableName: true
    });
  };