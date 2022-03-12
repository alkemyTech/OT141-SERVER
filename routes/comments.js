const router = require('express').Router();
// Middleware validations required
const { verifyToken, checkAdminRoleOrUserIdFromComment } = require('../middlewares');

// Controller Api required
const { update } = require('../controllers/comment.controller');

// Routes
// Update comment
router.put(
  '/:id',
  verifyToken,
  checkAdminRoleOrUserIdFromComment,
  update,
);

module.exports = router;
