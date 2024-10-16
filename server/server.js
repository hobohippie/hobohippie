const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const allowedOrigins = ['https://66.179.189.159', 'https://hobohippie.com', 'https://www.hobohippie.com', 'https://localhost:3000','http://66.179.189.159', 'http://hobohippie.com', 'http://www.hobohippie.com', 'http://localhost:3000'];
const PORT = 3000;

// MongoDB connection
const connectionString = "mongodb+srv://freeclements:Lilo3723542@cluster0.iw6qi1g.mongodb.net/hobohippie?retryWrites=true&w=majority"; // Specify your database name here

mongoose.set('strictQuery', false);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB connected to ${connectionString}`))
.catch(err => console.error('MongoDB connection error:', err));

// Session store
const store = new MongoDBStore({
    uri: connectionString, // Use the same MongoDB connection string
    collection: 'sessions' // Collection to store session data
});

// Session middleware
app.use(session({
    secret: 'hobohippie',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 
    }
}));

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

routes(app);

// Handle all other routes and serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server up and running on https://localhost:${PORT}`);
});

module.exports = app;
