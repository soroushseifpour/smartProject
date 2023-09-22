import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  educations: [{
    'id':1,
    'school':"Concordia University",
    'degree':"Bachelor",
    'major':"Software Engineering",
    'start':"Feb 2023",
    'finish':'Agu 2023',
  },
{
  "id":2,
  'school':"Concordia University",
  'degree':"Bachelor",
  'major':"Software Engineering",
  'start':"Feb 2023",
  'finish':'Agu 2023',
}],
  newEducation:{}
}

export const educationSlice = createSlice({
  name: 'educationexpereince',
  initialState,
  reducers: {
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
export const { adding, removing} = educationSlice.actions

export default educationSlice.reducer