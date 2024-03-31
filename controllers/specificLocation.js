const Location = require("../models/location")


exports.getSpecificLocationDetails = async (req, res) => {
    const { location_id } = req.params;
    try {
        const location = await Location.findById(location_id);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.putLocationDetails = async (req, res) => {
    const { location_id } = req.params;
    try {
        const updatedLocation = await Location.findByIdAndUpdate(location_id, req.body, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json(updatedLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.deleteLocationDetails = async (req, res) => {
    const { location_id } = req.params;
    try {
        // Find and delete location by ID
        const deletedLocation = await Location.findByIdAndDelete(location_id);
        if (!deletedLocation) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    
