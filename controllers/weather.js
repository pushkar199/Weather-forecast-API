const Location = require("../models/location");
const axios = require('axios');
require("dotenv").config();
console.log(process.env.API_KEY)

// Define a function to fetch weather details for a location
exports.getWeatherDetails = async (req, res) => {
    const { location_id } = req.params;

    try {
        // Find the location by ID
        const location = await Location.findById(location_id);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        // Fetch weather details from OpenWeatherMap API
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.API_KEY}`
        );

        // Extract relevant data from the weather response
        const { main, wind} = weatherResponse.data;

        // Prepare the forecast object
        const forecast = {
            temperature: main.temp,
            humidity: main.humidity,
            wind_speed: wind.speed,
        };

        // Send the forecast as JSON response
        res.json(forecast);
    } catch (error) {
        // Handle errors
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
