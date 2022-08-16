const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
  // get bearer token from req header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      req.user = await User.findById(decoded.id).select('-password')
      next()

    } catch (error) {
      console.log(error)
      res.status(400)
      throw new Error('Not authorized')
    }
  } else {
    throw new Error('Not authorized. No token.')
  }
})

module.exports = protect
