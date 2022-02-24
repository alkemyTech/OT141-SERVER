const db = require("../models");
const { check, validationResult } = require("express-validator");

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
    res.status(500).json({
      message: "Error validating email",
      error,
    });
  }
}

let validateInputsRegister = [
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
];

function functionValidateInputsRegister(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
let validationLogin = [
    check('email', 'The value is required').not().isEmpty(),
    check('password', 'The value is required').not().isEmpty(),
    check('email', 'The value is invalid').isEmail(),
    check('password', 'Requiered 8 min characters').isLength({ min: 8 })
]

module.exports = {
  validateInputsRegister,
  functionValidateInputsRegister,
  isEmailValidDB,
  validationLogin
};