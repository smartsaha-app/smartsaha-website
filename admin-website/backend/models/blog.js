'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.Category, { foreignKey: "categorie_id", as: "category" });
      Blog.belongsTo(models.User, { foreignKey: "user_id",  as: "user" });
      Blog.hasMany(models.Blogtranslate, {foreignKey: "blog_id", as: "blogtranslates"});
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    excerpt: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    image_public_id: DataTypes.STRING,
    categorie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};