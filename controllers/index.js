const authControllers = require('./auth');
const categoryControllers = require('./category');
const rolesControllers = require('./roles');

module.exports = {
  ...authControllers,
  ...categoryControllers,
  ...rolesControllers,
};
