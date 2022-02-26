const authControllers = require('./auth');
const categoriesControllers = require('./categories');

module.exports = {
  ...authControllers,
  ...categoriesControllers,
};
