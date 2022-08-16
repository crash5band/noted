import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import notesService from "./notesService"

const initialState = {
  notes: [],
  isLoading: false,
  isSucceess: false,
  isError: false,
  message: ""
}

const getNotes = createAsyncThunk("notes/get", async (note, token, thunkAPI) => {
  try {
    return await notesService.getNotes(token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const createNote = createAsyncThunk("notes/create", async (note, token, thunkAPI) => {
  try {
    return await notesService.createNote(note, token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const updateNote = createAsyncThunk("notes/update", async (note, token, thunkAPI) => {
  try {
    return await notesService.updateNote(note, token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const deleteNote = createAsyncThunk("notes/delete", async (id, token, thunkAPI) => {
  try {
    return await notesService.deleteNote(id, token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder    
    .addCase(getNotes.pending, state => {
      state.isLoading = true
    })
    .addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSucceess = true
      state.goals.push(action.payload)
    })
    .addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(createNote.pending, state => {
      state.isLoading = true
    })
    .addCase(createNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSucceess = true
      state.goals.push(action.payload)
    })
    .addCase(createNote.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(updateNote.pending, state => {
      state.isLoading = true
    })
    .addCase(updateNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSucceess = true
      state.goald = state.goals.map(n => n.id === action.payload.id ? action.payload : n)
    })
    .addCase(updateNote.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(deleteNote.pending, state => {
      state.isLoading = true
    })
    .addCase(deleteNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSucceess = true
      state.goals = state.goals.filter(n => n.id !== action.payload.id)
    })
    .addCase(deleteNote.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})

export const { reset } = notesSlice.actions
export default notesSlice.reducer
