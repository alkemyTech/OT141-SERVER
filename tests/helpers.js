const bcryptjs = require("bcryptjs");
const db = require("../models");

const createUser = async({firstName, lastName, email, password}) => {
    const salt = bcryptjs.genSaltSync();
    const passHashed = bcryptjs.hashSync(password,  salt);

    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password: passHashed,
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAT: new Date(),
      updatedAT: new Date()
    });
}

module.exports = {
  createUser
};