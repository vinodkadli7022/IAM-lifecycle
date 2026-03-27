const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    user: { type: String }, // Target user Name or ID
    details: { type: mongoose.Schema.Types.Mixed },
    performedBy: { type: String }, // User who performed the action string/id
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
