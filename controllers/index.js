const authControllers = require('./auth');
const categoryControllers = require('./category');
const rolesControllers = require('./roles');
const membersControllers = require('./member');

module.exports = {
  ...authControllers,
  ...categoryControllers,
  ...rolesControllers,
  ...membersControllers,
};
