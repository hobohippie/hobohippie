const accountController = require('../controllers/accountController');
const productController = require('../controllers/productController');
const supplierController = require('../controllers/supplierController');

module.exports = (app) => {
    // Account routes
    app.post('/api/login', accountController.login);
    app.post('/api/create-account', accountController.createAccount);

    // Supplier routes
    app.post('/api/create-supplier', supplierController.createSupplier);
    app.get('/api/suppliers', supplierController.getAllSuppliers);
    app.get('/api/suppliers/:id', supplierController.getSupplierById);
    app.put('/api/suppliers/:id', supplierController.updateSupplier);
    app.delete('/api/suppliers/:id', supplierController.deleteSupplier);

    // Product routes
    app.post('/api/create-product', productController.createProduct); 
    app.get('/api/products', productController.getAllProducts);
    app.get('/api/products/:id', productController.getProductById);
    app.put('/api/products/:id', productController.updateProduct);
    app.delete('/api/products/:id', productController.deleteProduct);
};
