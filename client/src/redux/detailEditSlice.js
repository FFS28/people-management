import { createSlice } from '@reduxjs/toolkit'

// Detail Info Initial State
const initialState = {
  container: 'map', // 'chart' | 'map'
  status: 2, // 'view' | 'edit' | 'add'
}

// Detail Info Editing Status Slice
export const detailEditStatusSlice = createSlice({
  name: 'detailEditInfo',
  initialState,
  reducers: {
    selectContainer: (state, action) => {
      return { ...state, container: action.payload } // Switch ContainerView to 'chart' or 'map'
    },
    // Set Editing Status of Personal Info
    setStatus: (state, action) => {
      return { ...state, status: action.payload }
    },
  },
})

export const { selectContainer, setStatus } = detailEditStatusSlice.actions

export default detailEditStatusSlice.reducer
