const router = require('express').Router();
// Middleware validations required
const { verifyToken, checkAdminRoleOrUserIdFromComment } = require('../middlewares');

// Controller Api required
const { remove } = require('../controllers/comment.controller');

// Routes
// Update comment
router.delete(
  '/:id',
  verifyToken,
  checkAdminRoleOrUserIdFromComment,
  remove,
);

module.exports = router;
