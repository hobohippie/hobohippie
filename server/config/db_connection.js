const dotenv = require('dotenv');
dotenv.config(); 

const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(connectionString)
  .then(() => console.log('Mongoose connected to the database - string changed'))
  .catch((err) => console.log(`Mongoose connection error: ${err}`));

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = mongoose;
