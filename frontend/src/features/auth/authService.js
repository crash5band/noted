import axios from "axios"

const API_URI = "http://localhost:5000/api/users/"

const register = async user => {
  const response = await axios.post(API_URI, user)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const login = async user => {
  const response = await axios.post(`${API_URI}login`, user)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  login,
  logout,
}

export default authService
