/* eslint-disable */
const {ROLE_ADMIN, ROLE_USER} = require('../constants/user.constants')
const password = require('../helpers/password')

const NUMBER_OF_ADMIN_USERS = 10
const NUMBER_OF_REGULAR_USERS = 10

async function createDemoUsers (numberOfAdmin, numberOfUser) {
  let users = []
  for (let i=1; i <= numberOfAdmin; i++) {
    users.push({
        firstName: `User ${i}`,
        lastName: 'Admin',
        email: `admin${i}@test.com`,
        // Important: Password not encrypted yet!
        password: await password.encrypt(`admin${i}`),
        roleId: ROLE_ADMIN,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    })
  }
  for (let i=1; i <= numberOfUser; i++) {
    users.push({
        firstName: `User ${i}`,
        lastName: 'Regular',
        email: `user${i}@test.com`,
        // Important: Password not encrypted yet!
        password: await password.encrypt(`user${i}`),
        roleId: ROLE_USER,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    })
  }
  return users
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await createDemoUsers(NUMBER_OF_ADMIN_USERS, NUMBER_OF_REGULAR_USERS);
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
  },
};
