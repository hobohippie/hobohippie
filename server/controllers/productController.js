const Product = require('../models/product-model');
const mongoose = require('mongoose');

module.exports = {
    async createProduct(req, res) {
        console.log(req.body, req.file);
        try {
            if (!req.body.name || !req.body.price) {
                return res.status(400).json({ message: 'Name and price are required.' });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'Image file is required.' });
            }
    
            const imageUrl = `hobohippie/server/uploads/${req.file.filename}`;
    
            const newProduct = new Product({
                ...req.body,
                image: imageUrl 
            });
    
            const savedProduct = await newProduct.save();
            res.status(201).json({
                message: 'Product created successfully',
                product: savedProduct
            });
        } catch (error) {
            console.error(error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', details: error.errors });
            }
            res.status(500).json({ message: 'Error creating product', error });
        }
    },
    

    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },

    async getProductById(req, res) {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ message: 'Invalid product ID.' });
            }

            const product = await Product.findById(req.params.id); // Find a product by ID
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching product', error });
        }
    },

    async updateProduct(req, res) {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ message: 'Invalid product ID.' });
            }

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update a product
            if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
            res.json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating product', error });
        }
    },

    async deleteProduct(req, res) {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ message: 'Invalid product ID.' });
            }

            const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete a product
            if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
};
