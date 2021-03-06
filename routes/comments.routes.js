const router = require('express').Router();
const commentController = require('../controllers/comment');
const { createCommentValidation } = require('../middlewares/comment');
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
router.put(
  '/:id',
  verifyToken,
  commentController.update,
);

// Delete comment
router.delete(
  '/:id',
  verifyToken,
  commentController.remove,
);

module.exports = router;
