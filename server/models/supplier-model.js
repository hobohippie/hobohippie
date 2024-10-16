const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contactInfo: {
        email: { type: String },
        phone: { type: String }
    },
    notes: {
        type: String
    },
    lastOrderedDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;
