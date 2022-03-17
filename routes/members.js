const router = require('express').Router();
const {
  list,
  deleteMember,
} = require('../controllers/member');
const {
  checkAdminRole,
} = require('../middlewares');

router.get(
  '/',
  checkAdminRole,
  list,
);

// delete member
router.delete(
  '/:id',
  deleteMember,
);

module.exports = router;
