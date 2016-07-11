'use strict';

module.exports = function(sequelize, DataTypes) {
  var OAuthScope = sequelize.define('oauth_scope', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    scope: DataTypes.STRING(80),
    is_default: DataTypes.BOOLEAN
  }, {
    tableName: 'oauth_scope',
    timestamps: false,
    underscored: true
  })

  return OAuthScope;
}
