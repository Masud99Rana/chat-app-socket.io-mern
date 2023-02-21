const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {

  const conn = await mongoose.connect(process.env.MONGO_URI);

  // const connection = mongoose.connection;
  // connection.on("connected", () => {
  //   console.log("Mongo DB connected successfully");
  // });

  // connection.on("error", (err) => {
  //   console.log("Mongo DB connection failed");
  // });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
