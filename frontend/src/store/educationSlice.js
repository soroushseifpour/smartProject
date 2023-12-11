import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  educations: [],
  newEducation:{}
}

export const educationSlice = createSlice({
  name: 'educationexpereince',
  initialState,
  reducers: {
    setting:(state,action)=>{
      state.educations=action.payload
    },
    adding: (state, action) => {
      state.educations = [...state.educations, action.payload];
    },
    editing:(state,action)=>{
      const { id, updatedEdc } = action.payload;
      // Find the index of the edc with the specified ID
      const eduIndex = state.educations.findIndex((ed) => ed._id.$oid === id);
      if (eduIndex !== -1) {
        // Update the edc at the found index with the updated data
        state.educations[eduIndex] = updatedEdc;
      }
    },
    removing: (state,action) => {
      state.educations=state.educations.filter(p=>p._id.$oid!==action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { adding, removing, setting,editing} = educationSlice.actions

export default educationSlice.reducer