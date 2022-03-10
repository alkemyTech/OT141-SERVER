const resError = require('./resError');
const createJWT = require('./createJWT');

module.exports = {
  ...resError,
  ...createJWT,
};
