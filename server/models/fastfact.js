const mongoose = require("mongoose");

//define a comment schema for the database
const FastFactsSchema = new mongoose.Schema({
  userId: String,
  type: String,
  nameId: String,
  category: String,
  description: String,
  universeId: String,
});

// compile model from schema
module.exports = mongoose.model("fastfact", FastFactsSchema);
