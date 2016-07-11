'use strict';

module.exports = function(sequelize, DataTypes) {
  var FTUser = sequelize.define('ft_user', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_name: DataTypes.STRING(32),
    password: DataTypes.STRING(32),
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    salt: DataTypes.STRING, //随机生成的密码key
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }, //0-活动状态，1-锁定状态
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'ft_user',
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        FTUser.belongsTo(models.FTRole, {
          foreignKey: 'role_id',
        });
      },
    }
  })

  return FTUser;
}
