const express = require("express")
const { getHistory } = require("../controllers/history")
const router = express.Router()


router.get("/history/:location_id",getHistory)

module.exports = router