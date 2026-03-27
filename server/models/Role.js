const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', roleSchema);
