const db = require("../models");
const bcrypt = require("bcryptjs");
const { createJWT, resError } = require("../helpers");

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
    const token = await createJWT(user.email)
    // const { roleId, id } = user;
    // const token = await createJWT({ roleId, email, id });

    res.status(200).json({
      ok: true,
      msg: "User logged in",
      token,
    });
  } catch (err) {
    resError(err, res);
  }
};

// DELETE USER = DELETE

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await db.User.findByPk(id);
    if (!userToDelete) {
      res.status(404).json({
        del: false,
        message: "it is not possible to delete that user since that id is not found in our database",
      })
    } else {
      await db.User.destroy({
        where: {
          id
        }
      })
      res.status(200).json({
        del: true,
        message: `user with id ${id} was deleted successfully`,
      })
    }
  } catch (error) {
    res.status(500).json({
      del: false,
      data: error
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  deleteUser,
};
