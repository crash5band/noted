const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Name, email, and password are all required to create a user')
  }

  // verify user does not already exist
  const exists = await User.findOne({ email })
  if (exists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // create user
  const hashedPassword = await hashPassword(password)
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  return res.status(200).json({
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.id)
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Cannot login without email or password')
  }

  // verify user exists
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User does not exist')
  }

  // authenticate user
  if (!await bcrypt.compare(password, user.password)) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  return res.status(200).json({
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  })
})

const get = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user)
})

const hashPassword = async password => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  })
}

module.exports = {
  register,
  login,
  get,
}
