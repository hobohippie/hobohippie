const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    pricingHistory: [
        {
            price: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ],
    inventory: {
        quantity: { type: Number, required: true },
        restockDate: { type: Date },
        lowStockThreshold: { type: Number, default: 10 }
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    images: [
        {
            url: { type: String, required: true },
            altText: { type: String }
        }
    ],
    tags: [String],
    featured: {
        type: Boolean,
        default: false
    },
    discount: {
        percentage: { type: Number, default: 0 },
        startDate: { type: Date },
        endDate: { type: Date }
    },
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
            rating: { type: Number, required: true },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
