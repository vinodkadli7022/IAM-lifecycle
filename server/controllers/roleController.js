const Role = require('../models/Role');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;
        const role = new Role({ roleName, permissions });
        await role.save();

        await AuditLog.create({
            action: 'ROLE_TEMPLATE_CREATED',
            user: 'System',
            details: `Created new role template: ${roleName}`,
            performedBy: req.user.name
        });

        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName, permissions } = req.body;

        const role = await Role.findById(id);
        if (!role) return res.status(404).json({ message: 'Role not found' });

        role.roleName = roleName || role.roleName;
        role.permissions = permissions || role.permissions;
        await role.save();

        // Role Template Engine: Bulk Update Users with this role
        if (permissions) {
            await User.updateMany(
                { role: id },
                { $set: { permissions: permissions } }
            );
        }

        await AuditLog.create({
            action: 'ROLE_TEMPLATE_UPDATED',
            user: 'System',
            details: `Updated role template: ${role.roleName} and applied to all assigned users.`,
            performedBy: req.user.name
        });

        res.json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) return res.status(404).json({ message: 'Role not found' });

        const usersWithRole = await User.countDocuments({ role: id });
        if (usersWithRole > 0) {
            return res.status(400).json({ message: 'Cannot delete role assigned to users.' });
        }

        await role.deleteOne();

        await AuditLog.create({
            action: 'ROLE_TEMPLATE_DELETED',
            user: 'System',
            details: `Deleted role template: ${role.roleName}`,
            performedBy: req.user.name
        });

        res.json({ message: 'Role removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getRoles, createRole, updateRole, deleteRole };
