/* eslint-disable */
const db = require('../models');
const password = require('../helpers/password');

module.exports = {
  createUsers: async (configUsers) => {
    let users = []
    for await (const item of configUsers) {
      for (let i=1; i <= item.quantity; i++) {
        users.push({
          firstName: `${item.firstName} ${i}`,
          lastName: item.lastName,
          email: `${item.email}${i}@test.com`,
          password: await password.encrypt(`${item.email}${i}`),
          roleId: item.roleId,
          photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }
    await db.User.bulkCreate(users);
  },
  createActivities: async () => {
    await db.Activity.bulkCreate([
      {
        name: 'Activity 1',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'Content Activity 1',
      },
      {
        name: 'Activity 2',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'Content Activity 2',
      },
      {
        name: 'Activity 3',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'Content Activity 3',
      },
    ])
  }
}