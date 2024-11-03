// dotenv package attaches environment variables to the 'process' object so we can reference them
require('dotenv').config()
// import express package
const express = require('express')
// import mongoose
const mongoose = require('mongoose')
// import routes
const wordRoutes = require('./routes/words')

const cors = require('cors');

// init express app
const app = express()


// Use CORS to allow requests from your React app
app.use(cors());

// middleware - called everytime a request is sent to the server
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// indicate where routes are coming from when landing on url endpoint
app.use('/', wordRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // start listening for requests only once connected to DB
    app.listen(process.env.PORT, () => {
      console.log('connected to database & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })