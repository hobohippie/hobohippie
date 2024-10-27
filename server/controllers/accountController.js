const bcrypt = require('bcrypt');
const Account = require('../models/account-model');
const jwt = require('jsonwebtoken');

module.exports = {
    async createAccount(req, res) {
        const { password, email } = req.body;

        try {
            // Check if the account already exists
            const existingAccount = await Account.findOne({ email });
            if (existingAccount) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new account
            const newAccount = new Account({
                ...req.body,
                password: hashedPassword
            });

            // Save the account to the database
            const savedAccount = await newAccount.save();
            res.status(201).json(savedAccount); // Return the saved account

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Find the account by email
            const account = await Account.findOne({ email });
            if (!account) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Check if the password matches
            const isMatch = await bcrypt.compare(password, account.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: account._id, email: account.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // Send the response with the token and account information
            res.json({ message: 'Login successful', account: { id: account._id, email: account.email }, token });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};
