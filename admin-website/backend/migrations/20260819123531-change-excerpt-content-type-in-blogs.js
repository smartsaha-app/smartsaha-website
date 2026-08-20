'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Blogs', 'excerpt', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn('Blogs', 'content', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Blogs', 'excerpt', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Blogs', 'content', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
