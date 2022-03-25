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
  createTestimonials: async () => {
    await db.Testimony.bulkCreate([
      {
        name: 'Testimony 1',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'Content Testimony 1',
      },
      {
        name: 'Testimony 2',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'Content Testimony 2',
      },
      {
        name: 'Testimony 3',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content: 'Content Testimony 3',
      },
    ])
  }
};
