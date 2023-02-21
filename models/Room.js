const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomsSchema = new Schema({
  name: String,
  roomId: String,
  userId: String,
});


module.exports = mongoose.model("Room", roomsSchema);