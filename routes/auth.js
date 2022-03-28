const express = require('express');

const router = express.Router();
const { registerUser, userLogin, getUserAuthenticated } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/authJWT');
const {
  validationLogin,
  isEmailValidDB,
  validateInputsRegister,
  functionValidateInputsRegister,
} = require('../middlewares/auth');

router.get('/me', verifyToken, getUserAuthenticated);

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
