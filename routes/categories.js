const router = require('express').Router();
const {
  createCategory,
  getAllCategories,
} = require('../controllers');
const {
  validateErrors,
  validationCreateCategory,
  verifyToken,
} = require('../middlewares');

// Create category
router.post(
  '/',
  verifyToken,
  validationCreateCategory,
  validateErrors,
  createCategory,
);

// Get all categories
router.get(
  '/',
  verifyToken,
  validateErrors,
  getAllCategories,
);

module.exports = router;
