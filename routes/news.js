const router = require('express').Router();

const { getNewById } = require('../controllers/new.controller');
const { verifyToken, checkAdminRole } = require('../middlewares');

// Get all news
router.get('/:id', verifyToken, checkAdminRole, getNewById);

module.exports = router;
