const db = require("../models");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    //I did not destruct password because it told me that line 18 was duplicated
    const resp = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const respHash = await bcrypt.hash(password, salt);
    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
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
