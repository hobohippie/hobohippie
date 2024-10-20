require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;
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
