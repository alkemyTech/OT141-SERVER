const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const { createCommentValidation } = require('../middlewares/comment.validations');
const {
  validateErrors,
  verifyToken,
  checkAdminRole,
} = require('../middlewares');

// Get all comments
router.get(
  '/',
  verifyToken,
  checkAdminRole,
  commentController.list,
);

// Post a new comment
router.post(
  '/',
  createCommentValidation,
  validateErrors,
  commentController.create,
);

// Get comments by post
router.get(
  '/:id/comments',
  commentController.listByPost,
);

// Update comment
router.delete(
  '/:id',
  verifyToken,
  commentController.remove,
);

module.exports = router;
