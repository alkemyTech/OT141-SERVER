var express = require('express');
const { userLogin } = require('../controllers');
const {
    validationLogin,
    validateErrors
} = require('../middlewares');
var router = express.Router();

// Login of user auth/login
router.post('/login', 
    validationLogin,
    validateErrors,
    userLogin
);

module.exports = router;
