var express = require('express');
const { check } = require('express-validator');
const { userLogin } = require('../controllers');
const { 
    validateErrors,
    isExistEmail
} = require('../middlewares');

var router = express.Router();

// Login of user auth/login
router.post('/login', [
    check('email', 'The value is required').not().isEmpty(),
    check('password', 'The value is required').not().isEmpty(),
    check('email', 'The value is invalid').isEmail(),
    check('password', 'Requiered 8 min characters').isLength({ min: 8 }),
    isExistEmail,
    validateErrors
], userLogin
);

module.exports = router;
