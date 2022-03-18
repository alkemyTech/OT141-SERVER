/* eslint-disable */
const bcryptjs = require('bcryptjs');
const db = require('../models');

const createUser = async ({
  firstName, lastName, email, password,roleId
}) => {
  const salt = bcryptjs.genSaltSync();
  const passHashed = bcryptjs.hashSync(password, salt);

  const newUser = await db.User.create({
    firstName,
    lastName,
    email,
    password: passHashed,
    roleId,
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    createdAT: new Date(),
    updatedAT: new Date(),
  });
  return newUser
};

module.exports = {
  createUser,
  createUsers
};
