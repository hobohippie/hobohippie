const bcrypt = require('bcrypt');
const Account = require('../models/account-model');

module.exports = {
    async createAccount(req, res) {
        const { body } = req;
        const { password, email } = body;

        try {
            // Check if email already exists (you already have this in place with the unique constraint)
            const existingAccount = await Account.findOne({ email });
            if (existingAccount) {
                return res.json("e-mail error");
            }

            // Hash the password before saving
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new account with the hashed password
            const newAccount = new Account({
                ...body,  // Spread all other fields
                password: hashedPassword  // Overwrite the password with the hashed password
            });

            const savedAccount = await newAccount.save();
            res.json(savedAccount);  // Send back the newly created account

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

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, account.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Set a session variable here or send back a JWT/token if using authentication tokens
            req.session.userId = account._id; // Store the user's ID in session

            res.json({ message: 'Login successful', account });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};
