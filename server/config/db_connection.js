const mongoose = require('mongoose')
const connectionString = "mongodb+srv://freeclements:Lilo3723542@cluster0.iw6qi1g.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${connectionString}`)
})

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connected error ${err}`)
})

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected")
})