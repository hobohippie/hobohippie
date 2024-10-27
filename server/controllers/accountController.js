const bcrypt = require('bcrypt');
const Account = require('../models/account-model');
const jwt = require('jsonwebtoken');

module.exports = {
    async createAccount(req, res) {
        const { body } = req;
        const { password, email } = body;

        try {
            const existingAccount = await Account.findOne({ email });
            if (existingAccount) {
                return res.json("e-mail error");
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newAccount = new Account({
                ...body,
                password: hashedPassword
            });

            const savedAccount = await newAccount.save();
            res.json(savedAccount);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const account = await Account.findOne({ email });
            if (!account) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, account.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate JWT
            const token = jwt.sign({ id: account._id, email: account.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            req.session.userId = account._id; // Store the user's ID in session
            res.json({ message: 'Login successful', account, token }); // Return the user object and token

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};
