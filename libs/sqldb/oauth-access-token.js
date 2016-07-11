'use strict';


module.exports = function(sequelize, DataTypes) {
  const OAuthAccessToken = sequelize.define('oauth_access_token', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    access_token: DataTypes.STRING(256),
    expires: DataTypes.DATE,
    scope: DataTypes.STRING
  }, {
    tableName: 'oauth_access_token',
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        OAuthAccessToken.belongsTo(models.OAuthClient, {
          foreignKey: 'client_id',
        });

        OAuthAccessToken.belongsTo(models.User, {
          foreignKey: 'user_id',
        });
      },
    },
  });

  return OAuthAccessToken;
};
