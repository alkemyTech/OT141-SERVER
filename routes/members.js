const router = require('express').Router();
const {
  list,
  createMember,
  deleteMember,
} = require('../controllers/member');
const {
  checkAdminRole,
  newMemberValidations,
  validateErrors,
} = require('../middlewares');

router.get(
  '/',
  checkAdminRole,
  list,
);

// Create member
router.post(
  '/',
  newMemberValidations,
  validateErrors,
  createMember,
);

// delete member
router.delete(
  '/:id',
  deleteMember,
);

module.exports = router;
