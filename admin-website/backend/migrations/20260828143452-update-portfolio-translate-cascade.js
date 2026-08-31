'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Portfoliotranslates',
      'Portfoliotranslates_portfolio_id_fkey'
    );

    await queryInterface.addConstraint('Portfoliotranslates', {
      fields: ['portfolio_id'],
      type: 'foreign key',
      name: 'Portfoliotranslates_portfolio_id_fkey',
      references: {
        table: 'Portfolios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'Portfoliotranslates',
      'Portfoliotranslates_portfolio_id_fkey'
    );

    await queryInterface.addConstraint('Portfoliotranslates', {
      fields: ['portfolio_id'],
      type: 'foreign key',
      name: 'Portfoliotranslates_portfolio_id_fkey',
      references: {
        table: 'Portfolios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
    });
  },
};
