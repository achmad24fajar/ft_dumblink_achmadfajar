'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sosmeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titleLink: {
        type: Sequelize.STRING
      },
      urlLink: {
        type: Sequelize.STRING
      },
      imageLink: {
        type: Sequelize.STRING
      },
      linkId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Links",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sosmeds');
  }
};