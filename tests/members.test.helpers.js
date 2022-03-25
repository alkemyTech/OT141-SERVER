/* eslint-disable */
const db = require("../models");
const { createUser } = require("./auth.test.helpers");

module.exports = {
  createUser,
  createMember: async (member) => {
  return await db.Member.create(member);
  },
};
