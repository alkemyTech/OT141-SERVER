var express = require("express");
var router = express.Router();

const { registerUser } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
const { isEmailValidDB } = require("../middlewares/auth");

router.post(
  "/register",
  [
    check("firstName")
      .isLength({ min: 5 })
      .withMessage("FirstName must have more than 5 characters"),
    check("lastName")
      .isLength({ min: 5 })
      .withMessage("LastName must have more than 5 characters"),
    check("email").isEmail().withMessage("Email must be like:email@gmail.com"),
    check("password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/
      )
      .withMessage(
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
      ),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  isEmailValidDB,
  registerUser
);

module.exports = router;
