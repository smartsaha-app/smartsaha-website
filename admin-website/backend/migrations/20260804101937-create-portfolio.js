'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Portfolios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      summary: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cover_image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      challenge: {
        allowNull: false,
        type: Sequelize.STRING
      },
      solution: {
        allowNull: false,
        type: Sequelize.STRING
      },
      key_features: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      technologies: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      gallery: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Portfolios');
  }
};