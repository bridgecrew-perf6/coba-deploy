'use strict';

const fs = require("fs");

module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const arts = JSON.parse(fs.readFileSync("./data/arts.json", "utf-8")).map(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e
    })
    console.log(arts);
    return queryInterface.bulkInsert("Arts", arts, {});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Arts", null, {});
  }
};
