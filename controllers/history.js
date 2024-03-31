const Location = require("../models/location"); 
const axios = require('axios');
require("dotenv").config();


function getUnixTimestamp(daysAgo) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000;
  return Math.round(timestamp / 1000);
}



exports.getHistory = async (req, res) => {
    const { location_id } = req.params;
    const days = req.body.days

    try {
        const location = await Location.findById(location_id);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        let start, end;

        switch (parseInt(days)) {
          case 2:
            start = getUnixTimestamp(2);
            end = getUnixTimestamp(0);
            break;
          case 7:
            start = getUnixTimestamp(7);
            end = getUnixTimestamp(0);
            break;
          case 15:
            start = getUnixTimestamp(15);
            end = getUnixTimestamp(0);
            break;
          case 30:
            start = getUnixTimestamp(30);
            end = getUnixTimestamp(0);
            break;
          default:
            return res.status(400).json({ error: 'Invalid value for days parameter' });
        }



          
        const historyResponse = await axios.get(
            `http://history.openweathermap.org/data/2.5/history/city?lat=${location.latitude}&lon=${location.longitude}&type=hour&start=${start}&end=${end}&appid=${process.env.API_KEY}`
        );
        
    

        return res.status(200).json({
            success: true,
            message: "Weather history fetched successfully",
            historyResponse
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
