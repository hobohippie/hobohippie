const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ],
    wishlist: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
    },
    orders: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
            date: { type: Date, default: Date.now },
            total: { type: Number, required: true }
        }
    ]
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;