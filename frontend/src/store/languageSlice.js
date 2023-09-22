import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    marks:{
        listening:7,
        reading:7,
        writing:7,
        speaking:7,
        finalMark:7
    }
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