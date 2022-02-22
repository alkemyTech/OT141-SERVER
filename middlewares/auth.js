const db = require("../models");

async function isEmailValidDB(req, res, next) {
  try {
    const email = req.body.email;
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(200).json({
        message: "Email already in use",
      });
    }
    next();
  } catch (error) {
    res.status(404).json({
      message: "Error validating email",
      error,
    });
  }
}

module.exports = {
  isEmailValidDB,
};
