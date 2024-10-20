require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://free:Lilo3723542@hobohippie.rdv1r.mongodb.net/?retryWrites=true&w=majority&appName=HoboHippie"
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
