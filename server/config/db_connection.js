require('dotenv').config();
const mongoose = require('mongoose');

// const connectionString = process.env.MONGODB_URI;
const connectionString = 'mongodb+srv://free:7130TulipTrail3723542@hobohippie.rdv1r.mongodb.net/?retryWrites=true&w=majority&appNçame=HoboHippie';

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://free:7130TulipTrail3723542@hobohippie.rdv1r.mongodb.net/?retryWrites=true&w=majority&appNçame=HoboHippie', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to the database`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = mongoose;
