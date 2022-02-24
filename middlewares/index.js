const validateErrors = require('./validateErrors');
const validationAuth = require('./auth');
module.exports = {
    ...validateErrors,
    ...validationAuth
}