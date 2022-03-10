const router = require('express').Router();
const {
  createCategory,
  getAllCategories,
  updateCategoryById,
  getCategoryById,
  deleteCategory,
} = require('../controllers/category');
const {
  validateErrors,
  validationCreateCategory,
  verifyToken,
  checkAdminRole,
} = require('../middlewares');

// Get all categories
router.get(
  '/',
  verifyToken,
  checkAdminRole,
  validateErrors,
  getAllCategories,
);

// Get category by id
router.get(
  '/:id',
  verifyToken,
  checkAdminRole,
  getCategoryById,
);

// Create category
router.post(
  '/',
  verifyToken,
  checkAdminRole,
  validationCreateCategory,
  validateErrors,
  createCategory,
);

// Update category
router.put(
  '/:id',
  verifyToken,
  checkAdminRole,
  validateErrors,
  updateCategoryById,
);

// Delete category
router.delete(
  '/:id',
  verifyToken,
  checkAdminRole,
  validateErrors,
  deleteCategory,
);

module.exports = router;
