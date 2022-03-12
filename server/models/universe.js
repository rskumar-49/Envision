const mongoose = require("mongoose");

//define a comment schema for the database
const Universe = new mongoose.Schema({
    userId: String,
    name: String,
});

// compile model from schema
module.exports = mongoose.model("universe", Universe);