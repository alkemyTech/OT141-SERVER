const authControllers = require('./auth');
const categoryControllers = require('./category');

module.exports = {
  ...authControllers,
  ...categoryControllers,
};
