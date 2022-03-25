const router = require('express').Router();

const { getNewById, createNew, updateNew } = require('../controllers/new.controller');
const { verifyToken, checkAdminRole } = require('../middlewares');

// Get all news
router.get('/:id', verifyToken, checkAdminRole, getNewById);

router.post('/', verifyToken, checkAdminRole, createNew);

// update New
router.put(
  '/:id',
  verifyToken,
  checkAdminRole,
  updateNew,
);

module.exports = router;
