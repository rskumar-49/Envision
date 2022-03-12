const mongoose = require("mongoose");

//define a comment schema for the database
const DescriptionSchema = new mongoose.Schema({
  userId: String,
  type: String,
  nameId: String,
  description: String,
  universeId: String,
});

// compile model from schema
module.exports = mongoose.model("description", DescriptionSchema);
