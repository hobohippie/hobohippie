const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dbConnection = require('./config/db_connection'); // Import the db_connection file to handle the database connection

const app = express();
const allowedOrigins = [
    'https://66.179.241.155', 'https://hobohippie.com', 'https://www.hobohippie.com',
    'https://localhost:3000', 'http://66.179.241.155', 'http://hobohippie.com',
    'http://www.hobohippie.com', 'http://localhost:3000'
];
const PORT = process.env.PORT || 3000; // Port from env or default to 3000

// Session store using MongoDB, but no connection is established here. dbConnection handles it.
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI, // Use the MongoDB URI from the .env file
    collection: 'sessions' // Collection to store session data
});

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret from .env file
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: true, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

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
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server up and running on https://66.179.241.155:${PORT}`);
});

module.exports = app;
