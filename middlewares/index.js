const validateErrors = require('./validateErrors');
const ValidateInDB = require('./validateInDB');

module.exports = {
    ...validateErrors,
    ...ValidateInDB
}