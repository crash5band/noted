import axios from "axios"

const API_URI = "http://localhost:5000/api/users/"

const register = async user => {
  console.log(user)
  const response = await axios.post(API_URI, user)
  if (response.data) {
    localStorage.setItem("user", response.data)
  }

  return response.data
}

const authService = {
  register,
}

export default authService
