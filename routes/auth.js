const express = require('express');

const router = express.Router();
const { registerUser, userLogin } = require('../controllers/auth');
const {
  validationLogin,
  isEmailValidDB,
  validateInputsRegister,
  functionValidateInputsRegister,
} = require('../middlewares/auth');

router
  .post(
    '/register',
    validateInputsRegister,
    functionValidateInputsRegister,
    isEmailValidDB,
    registerUser,
  );

// Login of user auth/login
router.post(
  '/login',
  validationLogin,
  userLogin,
);

module.exports = router;
