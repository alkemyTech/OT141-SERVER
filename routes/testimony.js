const router = require('express').Router();
const { updateTestimony } = require('../controllers/testimony');
const {
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
} = require('../middlewares');

// update testimony
router.post(
  '/:id',
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
  updateTestimony,
);

module.exports = router;
