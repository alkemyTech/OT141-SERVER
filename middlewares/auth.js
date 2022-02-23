const { check } = require('express-validator');

let validationLogin = [
    check('email', 'The value is required').not().isEmpty(),
    check('password', 'The value is required').not().isEmpty(),
    check('email', 'The value is invalid').isEmail(),
    check('password', 'Requiered 8 min characters').isLength({ min: 8 })
]

module.exports = {
    validationLogin
}