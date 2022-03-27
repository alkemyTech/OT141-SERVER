/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Testimonials', [{
      name: 'Testimony 1',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 2',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 3',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 4',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 5',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 6',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 7',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 8',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 9',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 10',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Testimony 11',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'content example',
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Testimonials', null, {});
  },
};
