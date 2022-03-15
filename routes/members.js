const router = require('express').Router();
const {
    list
} = require('../controllers/member');
const {
    checkAdminRole,
} = require('../middlewares');

router.get(
    '/',
    checkAdminRole,
    list,
);

module.exports = router