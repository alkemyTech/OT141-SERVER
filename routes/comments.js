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

router.post(
  '/',
  createCommentValidation,
  validateErrors,
  commentController.create,
);

module.exports = router;
