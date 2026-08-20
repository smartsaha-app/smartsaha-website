'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogtranslate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blogtranslate.belongsTo(models.Blog, {foreignKey:"blog_id", as: "blog"});
    }
  }
  Blogtranslate.init({
    title: DataTypes.STRING,
    excerpt: DataTypes.TEXT,
    content: DataTypes.TEXT,
    language: DataTypes.STRING,
    blog_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blogtranslate',
  });
  return Blogtranslate;
};