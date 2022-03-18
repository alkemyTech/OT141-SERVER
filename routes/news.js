const router = require('express').Router();

const { createNew } = require('../controllers/new.controller');
const { verifyToken, checkAdminRole } = require('../middlewares');

router.post('/', verifyToken, checkAdminRole, createNew);

module.exports = router;