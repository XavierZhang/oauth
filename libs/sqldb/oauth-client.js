'use strict';

module.exports = function AppModel(sequelize, DataTypes) {
  const OAuthClient = sequelize.define('oauth_client', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    client_id: DataTypes.STRING(80),
    client_secret: DataTypes.STRING(80),
    redirect_uri: DataTypes.STRING(2000),
    grant_types: DataTypes.STRING(80),
    scope: DataTypes.STRING
  }, {
    tableName: 'oauth_client',
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        OAuthClient.belongsTo(models.User, {
          foreignKey: 'user_id',
        });
      },
    },
  });

  return OAuthClient;
};
