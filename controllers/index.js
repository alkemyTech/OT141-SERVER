const authControllers = require('./auth');
const rolesControllers = require('./roles');

module.exports = {
    ...authControllers,
    ...rolesControllers,
}