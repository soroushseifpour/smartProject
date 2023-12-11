import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  works: [],
  newWork:{}
}

export const workSlice = createSlice({
  name: 'workexpereince',
  initialState,
  reducers: {
    setting:(state,action)=>{
      state.works=action.payload
    },
    adding: (state, action) => {
      state.works = [...state.works, action.payload];
    },
    editing:(state,action)=>{
      const { id, updatedWork } = action.payload;
      // Find the index of the work with the specified ID
      const workIndex = state.works.findIndex((work) => work._id.$oid === id);

      if (workIndex !== -1) {
        // Update the work at the found index with the updated data
        state.works[workIndex] = updatedWork;
      }
    },
    removing: (state,action) => {
      state.works=state.works.filter(p=>p._id.$oid!==action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { adding, removing,setting,editing} = workSlice.actions

export default workSlice.reducer