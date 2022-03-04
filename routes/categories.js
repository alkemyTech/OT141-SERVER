const router = require('express').Router();
const {
  createCategory,
  getAllCategories,
  updateCategoryById
} = require('../controllers/category');
const {
  validateErrors,
  validationCreateCategory,
  verifyToken,
  checkRole,
} = require('../middlewares');


// Get all categories
router.get(
  '/',
  verifyToken,
  checkRole,
  validateErrors,
  getAllCategories,
);

// Create category
router.post(
  '/',
  verifyToken,
  checkRole,
  validationCreateCategory,
  validateErrors,
  createCategory,
);

// Update category
router.put("/:id", checkRole, updateCategoryById);

module.exports = router;
