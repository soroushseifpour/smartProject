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
      console.log(action.payload)
      const obj={...action.payload,id:state.educations.length+1}
      console.log(obj)
      state.educations = [...state.educations, obj];
    },
    removing: (state,action) => {
      state.educations=state.educations.filter(p=>p.id!==action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { adding, removing, setting} = educationSlice.actions

export default educationSlice.reducer