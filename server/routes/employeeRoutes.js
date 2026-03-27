const express = require('express');
const router = express.Router();
const { getEmployees, getEmployeeById } = require('../controllers/employeeController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getEmployees);
router.route('/:id').get(getEmployeeById);

module.exports = router;
