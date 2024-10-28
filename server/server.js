const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./config/multer_config'); 
require('./config/db_connection'); 

const app = express();

const allowedOrigins = [
    'https://66.179.241.155', 'https://hobohippie.com', 'https://www.hobohippie.com',
    'http://66.179.241.155', 'http://hobohippie.com', 'http://www.hobohippie.com',
    'https://localhost:3000','http://localhost:3000','https://localhost:3001',
    'http://localhost:3001'
];
const PORT = process.env.PORT || 3000;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/images', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/static', express.static(path.join(__dirname, '../public_images')));

app.get('/test', (req, res) => {
    res.send('Server is running and static files are being served.');
});


const routes = require('./routes/routes');
routes(app);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hobohippie backend up and running on port ${PORT}.`);
});

module.exports = app;
