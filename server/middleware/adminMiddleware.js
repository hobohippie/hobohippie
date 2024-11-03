const Account = require('../models/account-model');

async function verifyAdmin(req, res, next) {
    try {
        const account = await Account.findById(req.userId);
        if (!account || !account.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error verifying admin status' });
    }
}

module.exports = verifyAdmin;
