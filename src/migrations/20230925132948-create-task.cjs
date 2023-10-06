'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isDone: Sequelize.BOOLEAN,
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      date: Sequelize.STRING,
      time: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  },
};
