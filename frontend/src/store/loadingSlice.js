import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loader:true
}

export const loaderSlice = createSlice({
  name: 'languauge',
  initialState,
  reducers: {
    set: (state, action) => {
      state.loader=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set} = loaderSlice.actions

export default loaderSlice.reducer