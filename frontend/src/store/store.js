import { configureStore } from '@reduxjs/toolkit'
import workReducer from './workSlice'
import educationReducer from './educationSlice'
import languageSlice from './languageSlice'
import userSlice from './userSlice'
export const store = configureStore({
  reducer: {
    work: workReducer,
    education: educationReducer,
    language:languageSlice,
    user:userSlice
  },
})