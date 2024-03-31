const Location = require("../models/location");

exports.getLocationDetails = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json({
            success: true,
            data: locations
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.postLocationDetails = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;

        // Validate input data
        if (!name || !latitude || !longitude) {
            return res.status(400).json({ error: "Name, latitude, and longitude are required fields" });
        }

        // Create a new instance of Location model
        const location = new Location({ name, latitude, longitude });

        // Save the location instance to the database
        await location.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: "Location created successfully",
            data: location
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
