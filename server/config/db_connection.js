
const mongoose = require('mongoose');
/*const connectionString = "mongodb+srv://hippie:gJ50vypHELXex52Z@hobohippie.pbtz1.mongodb.net/?retryWrites=true&w=majority&appName=Hobohippie";*/
const connectionString = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(connectionString)
  .then(() => console.log('Mongoose connected to the database'))
  .catch((err) => console.log(`Mongoose connection error: ${err}`));

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = mongoose;
