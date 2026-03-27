const User = require('../models/User');

const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ userType: 'Employee' })
            .populate('role')
            .populate('permissions')
            .select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id)
            .populate('role')
            .populate('permissions')
            .select('-password');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getEmployees, getEmployeeById };
