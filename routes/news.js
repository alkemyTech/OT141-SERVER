const router = require('express').Router();

const { getNewById, createNew } = require('../controllers/new.controller');
const { verifyToken, checkAdminRole } = require('../middlewares');

// Get all news
router.get('/:id', verifyToken, checkAdminRole, getNewById);

router.post('/', verifyToken, checkAdminRole, createNew);

module.exports = router;
