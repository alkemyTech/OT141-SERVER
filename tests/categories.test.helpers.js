/* eslint-disable */
const db = require("../models");
const { createUser } = require("./auth.test.helpers");

module.exports = {
  createUser,
  createCategory: async (category) => {
  return await db.Category.create(category);
  },
};
