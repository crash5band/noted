const register = (req, res) => {
  res.json('Register User')
}

const login = (req, res) => {
  res.json('Authenticate User')
}

const get = (req, res) => {
  res.json('Get User')
}

module.exports = {
  register,
  login,
  get,
}
