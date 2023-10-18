import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    marks:{}
}

export const languageSlice = createSlice({
  name: 'languauge',
  initialState,
  reducers: {
    adding: (state, action) => {
      state.marks=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { adding} = languageSlice.actions

export default languageSlice.reducer