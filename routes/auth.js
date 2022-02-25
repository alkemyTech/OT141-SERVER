var express = require("express");
var router = express.Router();
const { registerUser, userLogin } = require("../controllers/auth");
const {
  validationLogin,
  validateErrors,
  isEmailValidDB,
  validateInputsRegister,
  functionValidateInputsRegister,
} = require('../middlewares/auth');
const authJWT = require('../middlewares/authJWT')

router
  .post(
    "/register",
    validateInputsRegister,
    functionValidateInputsRegister,
    isEmailValidDB,
    registerUser)

// Login of user auth/login
router.post('/login',
  validationLogin,
  authJWT,
  userLogin
);

module.exports = router;
