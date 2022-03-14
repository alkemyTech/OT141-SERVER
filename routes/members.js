const router = require('express').Router();
const {
    deleteMember
} = require('../controllers/member');
// delete member
router.delete(
    '/:id',
    deleteMember
);

module.exports = router; 