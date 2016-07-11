'use strict';

module.exports = function(sequelize, DataTypes) {
  var FTRole = sequelize.define('ft_role', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    role: DataTypes.STRING(80)
  }, {
    tableName: 'ft_role',
    timestamps: false,
    underscored: true
  })

  return FTRole;
}
