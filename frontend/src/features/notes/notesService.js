import axios from "axios"

const API_URI = "http://localhost:5000/api/notes/"

const getAuthorizationConfig = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const getNotes = async token => {
  const response = await axios.get(API_URI, getAuthorizationConfig(token))
  return response.data
}

const createNote = async (note, token) => {
  const response = await axios.post(API_URI, note, getAuthorizationConfig(token))
  return response.data
}

const updateNote = async (note, token) => {
  const response = await axios.put(`${API_URI}/${note.id}`, note, getAuthorizationConfig(token))
  return response.data
} 

const deleteNote = async (id, token) => {
  const response = await axios.delete(`${API_URI}/${id}`, getAuthorizationConfig(token))
  return response.data
}

const notesService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
}

export default notesService
