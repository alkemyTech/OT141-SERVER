const router = require('express').Router();
const {
  createCategory,
} = require('../controllers');
const {
  validateErrors,
  validationCreateCategory,
  verifyToken,
  checkRole,
} = require('../middlewares');

// Create category
router.post(
  '/',
  verifyToken,
  checkRole,
  validationCreateCategory,
  validateErrors,
  createCategory,
);

module.exports = router;
