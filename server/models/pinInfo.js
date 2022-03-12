const mongoose = require("mongoose");

//define a comment schema for the database
const PinInfoSchema = new mongoose.Schema({
    userId: String,
    universeId: String,
    pinId: String,
    siteId: String,
});

// compile model from schema
module.exports = mongoose.model("pinInfo", PinInfoSchema);
