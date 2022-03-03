const db = require("../models");
const bcrypt = require("bcryptjs");
const { createJWT, resError } = require("../helpers");
const { sendTemplate } = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password: pass } = req.body;
    //I did not destruct password because it told me that line 18 was duplicated
    const salt = await bcrypt.genSalt(10);
    const respHash = await bcrypt.hash(pass, salt);
    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password: respHash,
    });

    // Send welcome email with template
    const from = 'ong.somos.mas1@gmail.com';
    const to = email;
    const templateId = 'd-27e5f687bb4444628a0555643a9c9b5f'; // id provided by sendgrid
    const dynamic_template_data = { firstName }; // variables used in the email tempalte
    
    sendTemplate (to, from, templateId, dynamic_template_data);
    
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

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: `The ${email} not exist`,
      });
    }

    // Verify Password
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "The passsword is wrong",
      });
    }

    //Create JWT
    const token = await createJWT(user.email);

    res.status(200).json({
      ok: true,
      msg: "User logged in",
      token,
    });
  } catch (err) {
    resError(err, res);
  }
};
module.exports = {
  registerUser,
  userLogin,
};
