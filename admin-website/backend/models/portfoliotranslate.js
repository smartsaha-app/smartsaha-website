'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfoliotranslate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portfoliotranslate.belongsTo(models.Portfolio, {foreignKey: "portfolio_id", as: "portfolio"});
    }
  }
  Portfoliotranslate.init({
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    challenge: DataTypes.STRING,
    solution: DataTypes.STRING,
    key_features: DataTypes.ARRAY(DataTypes.STRING),
    language: DataTypes.STRING,
    portfolio_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfoliotranslate',
  });
  return Portfoliotranslate;
};