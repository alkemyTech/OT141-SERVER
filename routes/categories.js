const router = require('express').Router();
const {
  createCategory,
  getAllCategories,
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

// Get all categories
router.get(
  '/',
  verifyToken,
  checkRole,
  validateErrors,
  getAllCategories,
);

module.exports = router;
