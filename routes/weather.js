const express = require("express")
const { getWeatherDetails } = require("../controllers/weather")
const router = express.Router()


router.get("/weather/:location_id", getWeatherDetails)

module.exports = router