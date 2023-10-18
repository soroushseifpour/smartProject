import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:{
        name:"Soroush",
        id:"650d034b04076f604b929cbc"
    }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    adding: (state, action) => {
      state.user=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { adding} = userSlice.actions

export default userSlice.reducer