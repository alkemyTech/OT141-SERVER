module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        name: 'Member 1',
        image: 'https://ecologiahoy.net/wp-conte/uploads/2020/02/paisajes-natutrales-member-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Member 2',
        image: 'https://ecologiahoy.net/wp-conte/uploads/2020/02/paisajes-natutrales-member-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Member 3',
        image: 'https://ecologiahoy.net/wp-conte/uploads/2020/02/paisajes-natutrales-member-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
