const mongoose = require("mongoose");

//define a comment schema for the database
const NamesSchema = new mongoose.Schema({
  userId: String,
  type: String,
  name: String,
  universeId: String,
});

// compile model from schema
module.exports = mongoose.model("names", NamesSchema);
