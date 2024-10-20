const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;
console.log('MongoDB URI:', connectionString);
mongoose.set('strictQuery', false);

mongoose.connect(connectionString, {
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
