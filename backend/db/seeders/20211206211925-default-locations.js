'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', [
      {
        ownerId: 1,
        title: 'Fun Beach House',
        description: 'A super fun beach house that is super fun... this is only an example of a fun place to go so tommy can test the db!',
        location: 'Florida Keys, Key West, FL',
        price: 375,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
