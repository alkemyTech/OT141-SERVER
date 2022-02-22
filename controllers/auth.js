const db = require("../models");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const resp = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const respHash = await bcrypt.hash(resp, salt);
    const newUser = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: respHash,
    });
    const { password, ...rest } = newUser.dataValues;
    res.status(201).json({
      message: "User created successfully",
      user: rest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
