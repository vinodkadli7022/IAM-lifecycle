const express = require('express');
const router = express.Router();
const { getRoles, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getRoles)
    .post(restrictTo('System Administrator'), createRole);

router.route('/:id')
    .put(restrictTo('System Administrator'), updateRole)
    .delete(restrictTo('System Administrator'), deleteRole);

module.exports = router;
