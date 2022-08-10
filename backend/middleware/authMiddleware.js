const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = (req, res) => {
  // get bearer token from req header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = User.findById(decoded.id).select('-password')

      if (!req.user) {
        res.status(400)
        throw new Error('User not found')
      }
    } catch (error) {
      console.log(error)
      res.status(400)
      throw new Error('Not authorized')
    }
  } else {
    throw new Error('Not authorized')
  }
}

module.exports = protect
