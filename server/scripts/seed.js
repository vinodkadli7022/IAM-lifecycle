const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load models
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const Request = require('../models/Request');
const AuditLog = require('../models/AuditLog');

dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ilap';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Role.deleteMany({});
        await Permission.deleteMany({});
        await Request.deleteMany({});
        await AuditLog.deleteMany({});

        // 1. Create Permissions
        const permissionsData = [
            { name: 'Email Access', system: 'Microsoft 365', description: 'Corporate email' },
            { name: 'GitHub Access', system: 'GitHub', description: 'Source code repository' },
            { name: 'Jira Access', system: 'Atlassian', description: 'Issue tracking' },
            { name: 'Slack Access', system: 'Slack', description: 'Team messaging' },
            { name: 'VPN Access', system: 'Cisco AnyConnect', description: 'Remote network access' },
            { name: 'Learning Portal', system: 'Cornerstone', description: 'Employee training' }
        ];
        const permissions = await Permission.insertMany(permissionsData);
        console.log('Permissions seeded.');

        // Function to get permission ID by name
        const getPermId = (name) => permissions.find(p => p.name === name)._id;

        // 2. Create Role Templates
        const rolesData = [
            {
                roleName: 'System Administrator',
                permissions: permissions.map(p => p._id) // All permissions
            },
            {
                roleName: 'HR Manager',
                permissions: [getPermId('Email Access'), getPermId('Slack Access'), getPermId('Learning Portal')]
            },
            {
                roleName: 'Backend Developer',
                permissions: [getPermId('Email Access'), getPermId('GitHub Access'), getPermId('Jira Access'), getPermId('Slack Access'), getPermId('VPN Access')]
            },
            {
                roleName: 'Standard Employee',
                permissions: [getPermId('Email Access'), getPermId('Slack Access')]
            }
        ];
        const roles = await Role.insertMany(rolesData);
        console.log('Roles seeded.');

        const getRoleId = (name) => roles.find(r => r.roleName === name)._id;

        // 3. Create Users
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('password123', salt);

        const usersData = [
            {
                name: 'Admin User',
                employeeId: 'EMP001',
                email: 'admin@company.com',
                password: passwordHash,
                userType: 'System Administrator',
                department: 'IT',
                role: getRoleId('System Administrator'),
                accountStatus: 'Active',
                permissions: roles.find(r => r.roleName === 'System Administrator').permissions
            },
            {
                name: 'Manager User',
                employeeId: 'EMP002',
                email: 'manager@company.com',
                password: passwordHash,
                userType: 'Manager',
                department: 'HR',
                role: getRoleId('HR Manager'),
                accountStatus: 'Active',
                permissions: roles.find(r => r.roleName === 'HR Manager').permissions
            },
            {
                name: 'Alice Employee',
                employeeId: 'EMP003',
                email: 'alice@company.com',
                password: passwordHash,
                userType: 'Employee',
                department: 'Engineering',
                role: getRoleId('Backend Developer'),
                accountStatus: 'Active',
                permissions: roles.find(r => r.roleName === 'Backend Developer').permissions
            }
        ];

        await User.insertMany(usersData);
        console.log('Users seeded. Default password is: password123');

        console.log('Database seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
