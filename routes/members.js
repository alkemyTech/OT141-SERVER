const router = require('express').Router();
const {
  list,
  createMember,
  deleteMember,
  updateMember
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
// Update member
router.put(
    '/:id',
    updateMember,
);

module.exports = router;

