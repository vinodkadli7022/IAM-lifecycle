const express = require('express');
const router = express.Router();
const { createRequest, getRequests, approveRequest, rejectRequest } = require('../controllers/workflowController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .post(createRequest)
    .get(restrictTo('Manager', 'System Administrator'), getRequests);

router.route('/:id/approve')
    .put(restrictTo('Manager', 'System Administrator'), approveRequest);

router.route('/:id/reject')
    .put(restrictTo('Manager', 'System Administrator'), rejectRequest);

module.exports = router;
