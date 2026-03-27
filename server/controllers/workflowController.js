const Request = require('../models/Request');
const User = require('../models/User');
const Role = require('../models/Role');
const AuditLog = require('../models/AuditLog');
const bcrypt = require('bcryptjs');

const createRequest = async (req, res) => {
    try {
        const { type, employeeName, targetUser, currentRole, requestedRole, department, resignationDetails } = req.body;

        const request = new Request({
            type,
            employeeName,
            targetUser,
            currentRole,
            requestedRole,
            department,
            resignationDetails,
            requestedBy: req.user._id,
            status: 'Pending'
        });

        await request.save();

        await AuditLog.create({
            action: `${type}_REQUEST_CREATED`,
            user: employeeName,
            details: `Created new ${type} request.`,
            performedBy: req.user.name
        });

        res.status(201).json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating request', error: error.message });
    }
};

const getRequests = async (req, res) => {
    try {
        const { type, status } = req.query;
        const query = {};
        if (type) query.type = type;
        if (status) query.status = status;

        const requests = await Request.find(query)
            .populate('requestedBy', 'name email')
            .populate('targetUser', 'name email')
            .populate('currentRole', 'roleName')
            .populate('requestedRole', 'roleName')
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id).populate('requestedRole');

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (request.status !== 'Pending') {
            return res.status(400).json({ message: 'Request is already processed' });
        }

        request.status = 'Approved';
        request.approvedBy = req.user._id;
        request.updatedAt = Date.now();

        let newEmployee = null;

        if (request.type === 'JOINER') {
            // Provision New Employee
            const empId = 'EMP' + Math.floor(1000 + Math.random() * 9000);
            const email = `${request.employeeName.split(' ').join('.').toLowerCase()}@company.com`;
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash('password123', salt);

            const targetRole = request.requestedRole;

            newEmployee = new User({
                name: request.employeeName,
                employeeId: empId,
                email,
                password,
                userType: 'Employee',
                department: request.department,
                role: targetRole._id,
                permissions: targetRole.permissions, // Role Template Engine assigns permissions
                accountStatus: 'Active'
            });

            await newEmployee.save();
            request.targetUser = newEmployee._id;

            await AuditLog.create({
                action: 'USER_PROVISIONED',
                user: newEmployee.name,
                details: `Account created. Employee ID: ${empId}, Email: ${email}, Role: ${targetRole.roleName}. Permissions assigned: ${targetRole.permissions.length}`,
                performedBy: 'Workflow Engine'
            });
        } else if (request.type === 'MOVER') {
            // Update Employee Role and Permissions
            const employee = await User.findById(request.targetUser);
            if (!employee) return res.status(404).json({ message: 'Target user not found' });

            const targetRole = request.requestedRole;

            employee.role = targetRole._id;
            employee.permissions = targetRole.permissions; // Role Template Engine overwrites permissions
            await employee.save();

            await AuditLog.create({
                action: 'ROLE_UPDATED',
                user: employee.name,
                details: `Role changed to ${targetRole.roleName}. Permissions replaced.`,
                performedBy: 'Workflow Engine'
            });
        } else if (request.type === 'LEAVER') {
            // Revoke Access
            const employee = await User.findById(request.targetUser);
            if (!employee) return res.status(404).json({ message: 'Target user not found' });

            employee.accountStatus = 'Disabled';
            employee.permissions = []; // Revoke everything
            await employee.save();

            await AuditLog.create({
                action: 'ACCESS_REVOKED',
                user: employee.name,
                details: 'Account disabled and all permissions revoked.',
                performedBy: 'Workflow Engine'
            });
        }

        await request.save();

        await AuditLog.create({
            action: `${request.type}_REQUEST_APPROVED`,
            user: request.employeeName,
            details: `${request.type} request approved.`,
            performedBy: req.user.name
        });

        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error approving request', error: error.message });
    }
};

const rejectRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);

        if (!request || request.status !== 'Pending') {
            return res.status(400).json({ message: 'Request not found or already processed' });
        }

        request.status = 'Rejected';
        request.approvedBy = req.user._id;
        request.updatedAt = Date.now();
        await request.save();

        await AuditLog.create({
            action: `${request.type}_REQUEST_REJECTED`,
            user: request.employeeName,
            details: `${request.type} request rejected.`,
            performedBy: req.user.name
        });

        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error rejecting request', error: error.message });
    }
};

module.exports = {
    createRequest,
    getRequests,
    approveRequest,
    rejectRequest
};
