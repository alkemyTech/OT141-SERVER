const { resError } = require("../helpers/resError");
const db = require("../models");

// validate if email exist in DB
const isExistEmail = async(req, res, next) => {
  try {
    const {email} = req.body;
    const user = await db.User.findOne({
      where: {email}
    });
    
    if (user) {
        return next();
    }

    res.status(400).json({
        ok: false,
        msg: `The ${email} not exist`
    });
  } catch (err) {
    resError(err, res);
  }
}

module.exports = {
  isExistEmail,
};