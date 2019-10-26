"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      bathroom: {
        type: Sequelize.FLOAT
      },
      bedroom: {
        type: Sequelize.INTEGER
      },
      bed: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      review_count: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Rooms");
  }
};
