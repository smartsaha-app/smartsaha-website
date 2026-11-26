'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    static associate(models) {
      Developer.hasMany(models.Task, { foreignKey: 'developer_id', as: 'tasks' });
    }
  }
  Developer.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  }, {
    sequelize,
    modelName: 'Developer',
    tableName: 'developers',
    underscored: true,
    updatedAt: false,
  });
  return Developer;
};
