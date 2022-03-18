const authControllers = require('./auth');
const categoryControllers = require('./category');
const rolesControllers = require('./roles');
const membersControllers = require('./members');

module.exports = {
  ...authControllers,
  ...categoryControllers,
  ...rolesControllers,
  ...membersControllers,
};
