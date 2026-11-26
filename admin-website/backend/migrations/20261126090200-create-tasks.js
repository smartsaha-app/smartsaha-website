'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'done');"
    );

    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      complaint_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'complaints', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      developer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'developers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      status: {
        type: 'task_status',
        allowNull: false,
        defaultValue: 'not_started',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tasks');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS task_status;');
  },
};
