const Permission = require('../models/Permission');

const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createPermission = async (req, res) => {
    try {
        const { name, system, description } = req.body;
        const permission = new Permission({ name, system, description });
        await permission.save();
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getPermissions, createPermission };
