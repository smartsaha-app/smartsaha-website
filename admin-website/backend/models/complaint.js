'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    static associate(models) {
      Complaint.hasMany(models.Task, { foreignKey: 'complaint_id', as: 'tasks', onDelete: 'CASCADE' });
    }
  }
  Complaint.init({
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    page: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'Complaint',
    tableName: 'complaints',
    underscored: true,
    updatedAt: false,
  });
  return Complaint;
};
