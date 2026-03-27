const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: { type: String, enum: ['JOINER', 'MOVER', 'LEAVER'], required: true },
    employeeName: { type: String, required: true },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currentRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    requestedRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    department: { type: String },
    resignationDetails: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
