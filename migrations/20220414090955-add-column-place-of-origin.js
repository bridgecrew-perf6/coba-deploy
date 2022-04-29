'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Arts", "placeOfOrigin", Sequelize.STRING);
  },

  down (queryInterface, Sequelize) {
     return queryInterface.removeColumn("Arts", "placeOfOrigin", {});
  }
};
