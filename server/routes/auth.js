const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// Route for login (example)
router.post('/login', login);

module.exports = router;
