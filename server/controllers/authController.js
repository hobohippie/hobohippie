const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Example: Retrieve user from the database
  const user = { id: 'userId123', username: 'freeclements', password: 'hashedPasswordFromDb' }; // Replace with real database query

  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    return res.status(401).send('Invalid credentials');
  }

  // Generate JWT if login is successful
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ auth: true, token });
};

module.exports = { login };
