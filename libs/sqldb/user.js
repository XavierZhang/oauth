'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
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
    airport: DataTypes.STRING, //机场编码
    airline: DataTypes.STRING, //航空公司编码
    license: DataTypes.INTEGER, //授权数量
    salt: DataTypes.STRING, //随机生成的密码key
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }, //0-活动状态，1-锁定状态
    scope: DataTypes.STRING,
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
    tableName: 'user', // oauth_users
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        //User.hasMany(models.OAuthClient);
      },
    },
  });

  return User;
}
