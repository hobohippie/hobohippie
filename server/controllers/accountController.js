const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/account-model');

// Load environment variables from .env file
require('dotenv').config();

module.exports = {
    // Account creation
    async createAccount(req, res) {
        const { password, email } = req.body;

        try {
            // Check if email already exists
            const existingAccount = await Account.findOne({ email });
            if (existingAccount) {
                return res.status(409).json({ message: "Email is already in use" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save the new account
            const newAccount = new Account({
                ...req.body,
                password: hashedPassword
            });
            const savedAccount = await newAccount.save();
            res.status(201).json({ message: "Account created successfully", account: savedAccount });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    
    // Login and JWT generation
    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Find the account by email
            const account = await Account.findOne({ email });
            if (!account) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, account.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate a JWT
            const token = jwt.sign(
                { userId: account._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Send back the JWT token
            res.json({ message: 'Login successful', token });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};
