var express = require("express");
var router = express.Router();

const { registerUser } = require("../controllers/auth");
const {
  isEmailValidDB,
  validateInputsRegister,
  functionvalidateInputsRegister,
} = require("../middlewares/auth");

router.post(
  "/register",
  validateInputsRegister,
  functionvalidateInputsRegister,
  isEmailValidDB,
  registerUser
);

module.exports = router;
