/* eslint-disable */
const {ROLE_ADMIN, ROLE_USER} = require('../constants/user.constants')
const password = require('../helpers/password')

const configUsers = [
  {
    roleId : ROLE_ADMIN,
    quantity: 10,
    firstName: 'User',
    lastName: 'Admin',
    email: 'admin',
  },
  {
    roleId : ROLE_USER,
    quantity: 10,
    firstName: 'User',
    lastName: 'Regular',
    email: 'user',
  },
]

async function createDemoUsers (configUsers) {
  let users = []
  for await (const item of configUsers) {
    for (let i=1; i <= item.quantity; i++) {
      users.push({
        firstName: `${item.firstName} ${i}`,
        lastName: item.lastName,
        email: `${item.email}${i}@test.com`,
        password: await password.encrypt(`${item.email}${i}`),
        roleId: item.roleId,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }
  return users
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await createDemoUsers(configUsers);
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
