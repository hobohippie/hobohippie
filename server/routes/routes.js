const express = require('express');
const accountController = require('../controllers/accountController');
const productController = require('../controllers/productController');
const supplierController = require('../controllers/supplierController');
const tagController = require('../controllers/tagController');
const paymentController = require('../controllers/paymentController');
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');
const upload = require('../config/multer_config')

module.exports = (app) => {
    // Accounts
    app.post('/api/login', accountController.login);
    app.post('/api/create-account', accountController.createAccount);

    // Suppliers
    app.post('/api/create-supplier', supplierController.createSupplier);
    app.get('/api/suppliers', supplierController.getAllSuppliers);
    app.get('/api/suppliers/:id', supplierController.getSupplierById);
    app.put('/api/suppliers/:id', supplierController.updateSupplier);
    app.delete('/api/suppliers/:id', supplierController.deleteSupplier);

    // Products
    app.post('/api/create-product', upload.single('image'), productController.createProduct); 
    app.get('/api/products', productController.getAllProducts);
    app.get('/api/products/:id', productController.getProductById);
    app.put('/api/products/:id', productController.updateProduct);
    app.delete('/api/products/:id', productController.deleteProduct);

    // Tags
    app.get('/api/tags', tagController.getAllTags)
    app.post('/api/tags', tagController.createTag)
    app.delete('/api/tags/:name', tagController.deleteTag)

    // Payments
    app.post('/api/create-payment-intent', verifyToken, paymentController.createPayment)
    app.post('/api/webhook', express.raw({type: 'application/json'}), paymentController.handleWebhook);

    // Admin Orders Routes
    app.get('/api/admin/orders', verifyToken, verifyAdmin, orderController.getAllOrders);
    app.put('/api/admin/orders/:orderId', verifyToken, verifyAdmin, orderController.updateOrderStatus);
};
