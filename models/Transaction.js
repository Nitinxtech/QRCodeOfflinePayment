const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: String, required: true },
    synced: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Transaction', TransactionSchema);
