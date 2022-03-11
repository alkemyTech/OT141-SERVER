const router = require('express').Router();
const { createTestimony } = require('../controllers/testimony');
const {
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
} = require('../middlewares');

// Create testimony
router.post(
  '/',
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
  createTestimony,
);











module.exports = router;

