const mongoose = require("mongoose");

//define a comment schema for the database
const MapPinSchema = new mongoose.Schema({
    userId: String,
    ori_x: Number,
    ori_y: Number,
    universeId: String,
});

// compile model from schema
module.exports = mongoose.model("mapPin", MapPinSchema);
