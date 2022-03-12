const mongoose = require("mongoose");

const MapImageSchema = new mongoose.Schema({
  userId: String,
  universeId: String,
  imageString: String,
});

// compile model from schema
module.exports = mongoose.model("mapImage", MapImageSchema);
