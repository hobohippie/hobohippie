const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const upload = require('./config/multer_config'); 
require('./config/db_connection'); 

const app = express();
const allowedOrigins = [
    'https://66.179.241.155', 'https://hobohippie.com', 'https://www.hobohippie.com',
    'https://localhost:3000', 'http://66.179.241.155', 'http://hobohippie.com',
    'http://www.hobohippie.com', 'http://localhost:3000'
];
const PORT = process.env.PORT || 3000;

// CORS setup
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes setup
const routes = require('./routes/routes');
routes(app);

// Handle all other routes and serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hobohippie backend up and running on port ${PORT}.`);
});

module.exports = app;
