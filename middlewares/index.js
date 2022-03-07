const validateErrors = require('./validateErrors');
const validationAuth = require('./auth');
const validationRoles = require('./roles');
module.exports = {
    ...validateErrors,
    ...validationAuth,
    ...validationRoles,
}