"use strict";

const fs = require("fs").promises;
const csv = require("async-csv");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const file = await fs.readFile("./house.csv");
    const data = await csv.parse(file);
    const keys = data.shift();
    let rooms = [];
    data.map((info, idx) => {
      let obj = {};
      keys.forEach((key, keyIdx) => {
        if (key === "desc") return;
        obj[key] = info[keyIdx];
      });
      rooms.push(obj);
    });

    return queryInterface.bulkInsert("Rooms", rooms, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rooms", null, {});
  }
};
