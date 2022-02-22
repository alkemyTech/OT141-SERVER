const db = require("../models");

const registerUser = async (req, res) => {
  try {
    const newUser = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
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
