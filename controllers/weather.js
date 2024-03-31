const Location = require("../models/location");
const axios = require('axios');
require("dotenv").config();

exports.getWeatherDetails = async (req, res) => {
    const { location_id } = req.params;

    try {
        const location = await Location.findById(location_id);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.API_KEY}`
        );

        const { main, wind} = weatherResponse.data;

        const forecast = {
            temperature: main.temp,
            humidity: main.humidity,
            wind_speed: wind.speed,
        };

        res.json(forecast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
