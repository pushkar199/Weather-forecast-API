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

        const location = new Location({ name, latitude, longitude });

        await location.save();

        res.status(201).json({
            success: true,
            message: "Location created successfully",
            data: location
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
