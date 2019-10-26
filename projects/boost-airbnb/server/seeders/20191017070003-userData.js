"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // 시드를 수행할 때
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          userId: "admin",
          userPassword: "admin",
          userName: "admin"
        },
        {
          userId: "testuser",
          userPassword: "test",
          userName: "tester"
        },
        {
          userId: "testuser2",
          userPassword: "test",
          userName: "tester2"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // 시드를 취소할 때
    return queryInterface.bulkInsert("Users", null, {});
  }
};
