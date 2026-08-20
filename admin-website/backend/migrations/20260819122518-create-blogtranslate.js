'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blogtranslates', {
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
      excerpt: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING
      },
      blog_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Blogs',
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
    await queryInterface.dropTable('Blogtranslates');
  }
};