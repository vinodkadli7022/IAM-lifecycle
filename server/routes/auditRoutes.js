const express = require('express');
const router = express.Router();
const { getAuditLogs } = require('../controllers/auditController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);
router.use(restrictTo('System Administrator', 'Manager'));

router.route('/').get(getAuditLogs);

module.exports = router;
