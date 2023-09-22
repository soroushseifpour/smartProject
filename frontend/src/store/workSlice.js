import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  works: [{
    'id':1,
    'position':"Software developer(Internship)",
    'company':"Smart immigration",
    'start':"Feb 2023",
    'end':'Agu 2023',
    'duties':'Develop a console application using C++ and a file system manager using Heap Tree and LinkedList to manage files based on the different categories by collaborating with a team of 3 people.Using LinkedList and data structures in C++ to manage almost 100 text file from different universities after doing web scraping'
  },
{
  "id":2,
  'position':"Software developer(Internship)",
  'company':"Smart immigration",
  'start':"Feb 2023",
  'end':'Agu 2023',
  'duties':
      'Develop a console application using C++ and a file system manager using Heap Tree and LinkedList to manage files based on the different categories by collaborating with a team of 3 people.Using LinkedList and data structures in C++ to manage almost 100 text file from different universities after doing web scraping'
}],
  newWork:{}
}

export const workSlice = createSlice({
  name: 'workexpereince',
  initialState,
  reducers: {
    adding: (state, action) => {
      console.log(action.payload)
      state.works = [...state.works, action.payload];
    },
    removing: (state,action) => {
      state.works=state.works.filter(p=>p.id!==action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { adding, removing} = workSlice.actions

export default workSlice.reducer