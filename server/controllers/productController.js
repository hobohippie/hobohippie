const Product = require('../models/product-model');

module.exports = {
    async createProduct(req, res) {
        try {
            // Validate required fields
            if (!req.body.name || !req.body.price) {
                return res.status(400).json({ message: 'Name and price are required.' });
            }

            // Create new product with uploaded image path
            const newProduct = new Product({
                ...req.body,
                image: req.file.path // Add the image path from multer
            });

            const savedProduct = await newProduct.save();
            res.status(201).json({
                message: 'Product created successfully',
                product: savedProduct
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating product', error });
        }
    },
    
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },

    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id); // Find a product by ID
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    },

    async updateProduct(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update a product
            if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    },

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete a product
            if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
};
