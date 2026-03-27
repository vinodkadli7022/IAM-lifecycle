const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employeeId: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Employee', 'Manager', 'System Administrator'], default: 'Employee' },
    department: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    accountStatus: { type: String, enum: ['Active', 'Pending', 'Disabled'], default: 'Pending' },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
