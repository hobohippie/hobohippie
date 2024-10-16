const Supplier = require('../models/supplier-model');

module.exports = {
    // Get all suppliers
    async getAllSuppliers(req, res) {
        try {
            const suppliers = await Supplier.find();
            res.status(200).json(suppliers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching suppliers' });
        }
    },

    // Create a new supplier
    async createSupplier(req, res) {
        const { name, email, phone, notes, lastOrderedDate } = req.body;

        try {
            // Check if supplier with the same name already exists
            const existingSupplier = await Supplier.findOne({ name });
            if (existingSupplier) {
                return res.status(400).json('Supplier already exists');
            }

            // Create a new supplier
            const newSupplier = new Supplier({
                name,
                contactInfo: { email, phone },
                notes,
                lastOrderedDate
            });

            // Save the supplier to the database
            const savedSupplier = await newSupplier.save();
            res.status(201).json(savedSupplier);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating supplier' });
        }
    },

    // Get a single supplier by ID
    async getSupplierById(req, res) {
        const { id } = req.params;

        try {
            const supplier = await Supplier.findById(id);
            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            res.status(200).json(supplier);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching supplier' });
        }
    },

    // Update a supplier by ID
    async updateSupplier(req, res) {
        const { id } = req.params;
        const { name, email, phone, notes, lastOrderedDate } = req.body;

        try {
            const supplier = await Supplier.findById(id);
            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            // Update supplier fields
            supplier.name = name || supplier.name;
            supplier.contactInfo.email = email || supplier.contactInfo.email;
            supplier.contactInfo.phone = phone || supplier.contactInfo.phone;
            supplier.notes = notes || supplier.notes;
            supplier.lastOrderedDate = lastOrderedDate || supplier.lastOrderedDate;

            const updatedSupplier = await supplier.save();
            res.status(200).json(updatedSupplier);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating supplier' });
        }
    },

    // Delete a supplier by ID
    async deleteSupplier(req, res) {
        const { id } = req.params;

        try {
            const supplier = await Supplier.findById(id);
            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            await supplier.remove();
            res.status(200).json({ message: 'Supplier deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting supplier' });
        }
    }
};
