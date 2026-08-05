'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {


    // Table Blogs
    await queryInterface.addColumn(
        'Blogs',
        'image_public_id',
        {
            type: Sequelize.STRING,
            allowNull: true
        }
    );

    // Table Portfolios
    await queryInterface.addColumn(
        'Portfolios',
        'cover_image_public_id',
        {
            type: Sequelize.STRING,
            allowNull: true
        }
    );

    await queryInterface.addColumn(
        'Portfolios',
        'gallery_public_ids',
        {
            type: Sequelize.ARRAY(
                Sequelize.STRING
            ),
            allowNull: true
        }
    );

  },


  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn(
        'Blogs',
        'image_public_id'
    );

    await queryInterface.removeColumn(
        'Portfolios',
        'cover_image_public_id'
    );

    await queryInterface.removeColumn(
        'Portfolios',
        'gallery_public_ids'
    );

  }

};
