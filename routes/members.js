const router = require('express').Router();
const {
    updateMember
} = require('../controllers/member');
// Update member
router.put(
    '/:id',
    updateMember,
);

module.exports = router;