require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://free:7130TulipTrail3723542@hobohippie.rdv1r.mongodb.net/?retryWrites=true&w=majority&appName=HoboHippie';

mongoose.set('strictQuery', false);

mongoose.connect(connectionString)
  .then(() => console.log('Mongoose connected to the database'))
  .catch((err) => console.log(`Mongoose connection error: ${err}`));

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = mongoose;
