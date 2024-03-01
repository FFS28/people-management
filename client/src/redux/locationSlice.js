import { createSlice } from '@reduxjs/toolkit'

// Location Slice
export const locationSlice = createSlice({
  name: 'locations',
  initialState: [],
  reducers: {
    addLocation: (_, action) => {
      return [...action.payload] // Replace Locations of Friends each time
    },
    attatchLocation: (state, action) => {
      return [action.payload, ...state]
    },
    removeLocation: (state, action) => {
      return state.filter((location) => location.id !== action.payload)
    },
    removeAllLocations: () => {
      return []
    },
  },
})

export const {
  addLocation,
  attatchLocation,
  removeLocation,
  removeAllLocations,
} = locationSlice.actions

export default locationSlice.reducer
