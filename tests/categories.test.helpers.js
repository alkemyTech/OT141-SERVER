/* eslint-disable */
const db = require("../models");
const { createUser } = require("./helpers");

module.exports = {
  createUser,
  createCategory: async (category) => {
  return await db.Category.create(category);
  },
};
