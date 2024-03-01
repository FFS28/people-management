import { configureStore } from '@reduxjs/toolkit'

import locations from './locationSlice'
import people from './peopleSlice'
import person from './personSlice'
import detailEditInfo from './detailEditSlice'

export const store = configureStore({
  reducer: {
    locations,
    people,
    person,
    detailEditInfo,
  },
})
