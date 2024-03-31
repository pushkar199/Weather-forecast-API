const express = require("express")
const router = express.Router()

const {getLocationDetails, postLocationDetails} = require("../controllers/location")
const { getSpecificLocationDetails, putLocationDetails, deleteLocationDetails } = require("../controllers/specificLocation")

router.get("/location", getLocationDetails)
router.post("/location", postLocationDetails)
router.get("/location/:location_id",getSpecificLocationDetails)
router.put("/location/:location_id",putLocationDetails)
router.delete("/location/:location_id",deleteLocationDetails)



module.exports = router