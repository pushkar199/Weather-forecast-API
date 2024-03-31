const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    }
});

const Location = mongoose.model("Location", locationsSchema);

module.exports = Location;
