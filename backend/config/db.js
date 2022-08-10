const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo DB connected`.cyan.underline)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
