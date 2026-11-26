'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Complaint, { foreignKey: 'complaint_id', as: 'complaint' });
      Task.belongsTo(models.Developer, { foreignKey: 'developer_id', as: 'developer' });
    }
  }
  Task.init({
    complaint_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    developer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('not_started', 'in_progress', 'done'),
      allowNull: false,
      defaultValue: 'not_started',
    },
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
  });
  return Task;
};
