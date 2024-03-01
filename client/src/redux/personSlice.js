import { createSlice } from '@reduxjs/toolkit'

// Person Initial State
const initialState = {
  id: '',
  forename: '',
  surname: '',
  dob: '',
  ssn: '',
  issuedDateAndTime: '',
  friends: [],
  primaryLocation: {
    type: 'Point',
    coordinates: [51.917738, 17.455256],
  },
}

// Person Slice
export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    selectPerson: (state, action) => {
      return { ...state, ...action.payload }
    },
    deSelectPerson: () => {
      return initialState
    },
    addFriend: (state, action) => {
      const newFriendsList = [action.payload, ...state.friends]
      return { ...state, friends: newFriendsList }
    },
    deleteFriend: (state, action) => {
      const newFriendsList = state.friends.filter((id) => id !== action.payload)
      return { ...state, friends: newFriendsList }
    },
  },
})

export const { selectPerson, deSelectPerson, addFriend, deleteFriend } =
  personSlice.actions

export default personSlice.reducer
