const express = require('express');
const router = express.Router();
const { getPermissions, createPermission } = require('../controllers/permissionController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getPermissions)
    .post(restrictTo('System Administrator'), createPermission);

module.exports = router;
