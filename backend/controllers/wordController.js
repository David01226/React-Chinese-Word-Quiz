// import workout model
const Word = require('../models/wordModel')
const mongoose = require('mongoose')

// GET all words
const getAllWords = async (req, res) => {

  try {
    // Fetches all words
    const words = await Word.find({});
    res.status(200).json(words);
    console.log('fetched')
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ message: "Server error: Unable to fetch words" });
    console.log('not fetched')
  }
}

// export the functions
module.exports = {
  getAllWords
}