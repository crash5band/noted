import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import notesService from "./notesService"

const initialState = {
  notes: [],
  isLoading: false,
  isSucceess: false,
  isError: false,
  message: ""
}

export const getNotes = createAsyncThunk("notes/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await notesService.getNotes(token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createNote = createAsyncThunk("notes/create", async (note, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await notesService.createNote(note, token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateNote = createAsyncThunk("notes/update", async (note, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await notesService.updateNote(note, token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteNote = createAsyncThunk("notes/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
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
      state.notes = action.payload
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
      state.notes.push(action.payload)
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

      // find index of update note
      const index = notesService.findNoteIndex(state.notes, action.payload._id)
      state.notes = [...state.notes.slice(0, index), action.payload, ...state.notes.slice(index + 1)]
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
      state.notes = state.notes.filter(n => n._id !== action.payload.id)
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
