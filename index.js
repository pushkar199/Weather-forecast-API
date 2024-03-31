const express = require('express')
const app = express()
const rateLimit = require('express-rate-limit');
const database = require("./config/database")
const locationRoutes = require("./routes/locations")
const weatherRoutes = require("./routes/weather")
const historyRoutes = require("./routes/history")
const cookieParser = require("cookie-parser");
require("dotenv").config();
console.log(process.env.PORT)
const PORT = process.env.PORT

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 50, 
  });
  
  app.use(limiter);

  app.use(express.json());
  app.use(cookieParser());

  database.connect()

  app.get('/', (req, res) => {
    return res.send({
        message: 'Welcome to the Weather API'
    })
  })

  app.use('/', locationRoutes);
  app.use('/', historyRoutes);
  app.use('/', weatherRoutes);

  app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
  })