'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacientConts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cell: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      posicao: {
        type: Sequelize.DataTypes.INTEGER,
        
      },
      status: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 2,
        references: {model:'situacoes', key: 'id'}
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
    await queryInterface.dropTable('pacientConts');
  }
};