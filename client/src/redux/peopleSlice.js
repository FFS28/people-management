import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// People Initial State
const initialState = {
  data: [], // Person[]
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  inserted: [], // People Ids who Added
}

// Async thunk for fetching people
export const apiFetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/people`
    )
    return response.data
  }
)

// Async thunk for adding a person
export const apiAddPerson = createAsyncThunk(
  'people/addPerson',
  async (person) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/people`,
      person
    )
    return response.data
  }
)

// Async thunk for editing a person
export const apiEditPerson = createAsyncThunk(
  'people/editPerson',
  async (person) => {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/people/${person.id}`,
      person
    )
    return response.data
  }
)

// Async thunk for deleting a person
export const apiDeletePerson = createAsyncThunk(
  'people/deletePerson',
  async (person) => {
    const response = await axios.delete(`/people/${person.id}`)
    return response.data
  }
)

// People Slice
const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPerson: (state, action) => {
      const newData = [...state.data, action.payload]
      return { ...state, data: newData }
    },
    editPerson: (state, action) => {
      const updatedData = state.data.map((person) =>
        person.id === action.payload.id ? action.payload : person
      )
      return { ...state, data: updatedData }
    },
    removePerson: (state, action) => {
      const newData = state.data.filter(
        (person) => person.id !== action.payload
      )
      return { ...state, data: newData }
    },
    insertAddedPersonId: (state, action) => {
      const inserted = [...state.inserted, action.payload]
      return { ...state, inserted }
    },
  },
  extraReducers: (builder) => {
    // For API status Handling
    builder
      // Case for Fetching People
      .addCase(apiFetchPeople.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(apiFetchPeople.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(apiFetchPeople.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Could not fetch people'
      })
      // Case for Adding Person
      .addCase(apiAddPerson.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(apiAddPerson.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(action.payload)
        state.inserted.push(action.payload.id)
      })
      .addCase(apiAddPerson.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Could not add the person'
      })
      // Case for Editing Person
      .addCase(apiEditPerson.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(apiEditPerson.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedData = state.data.map((person) =>
          person.id === action.payload.id ? action.payload : person
        )
        state.data = updatedData
      })
      .addCase(apiEditPerson.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Could not edit the person'
      })
  },
})

export const { addPerson, removePerson, insertAddedPersonId } =
  peopleSlice.actions

export default peopleSlice.reducer
