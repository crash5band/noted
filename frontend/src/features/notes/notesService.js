import axios from "axios"

const API_URI = "http://localhost:5000/api/notes/"

const getAuthorizationConfig = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const getNotes = async token => {
  return await axios.get(API_URI, getAuthorizationConfig(token)).data
}

const createNote = async (note, token) => {
  return await axios.post(API_URI, note, getAuthorizationConfig(token)).data
}

const updateNote = async (note, token) => {
  return await axios.put(`${API_URI}/${note.id}`, note, getAuthorizationConfig(token)).data
} 

const deleteNote = async (id, token) => {
  return await axios.delete(`${API_URI}/${id}`, getAuthorizationConfig(token)).data
}

export const notesService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
}
