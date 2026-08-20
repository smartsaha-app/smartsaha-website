'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Portfoliotranslates', {
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
      portfolio_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Portfolios",
          key: "id"
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
    await queryInterface.dropTable('Portfoliotranslates');
  }
};