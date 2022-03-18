const router = require('express').Router();

const { updateNew } = require('../controllers/new.controller');

const { verifyToken, checkAdminRole } = require('../middlewares');

// update New
router.put(
  '/:id',
  verifyToken,
  checkAdminRole,
  updateNew,
);

module.exports = router;
