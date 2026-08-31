'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portfolio.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Portfolio.hasMany(models.Portfoliotranslate, {
        foreignKey: "portfolio_id", as: "portfoliotranslates", onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Portfolio.init({
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    cover_image: DataTypes.STRING,
    cover_image_public_id: DataTypes.STRING,
    challenge: DataTypes.STRING,
    solution: DataTypes.STRING,
    key_features: DataTypes.ARRAY(DataTypes.STRING),
    technologies: DataTypes.ARRAY(DataTypes.STRING),
    gallery: DataTypes.ARRAY(DataTypes.STRING),
    gallery_public_ids: DataTypes.ARRAY(DataTypes.STRING),
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};