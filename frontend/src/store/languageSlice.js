import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    marks:[]
}

export const languageSlice = createSlice({
  name: 'languauge',
  initialState,
  reducers: {
    adding: (state, action) => {
      state.marks=[...state.marks,action.payload]
    },
    setting:(state,action)=>{
      state.marks=action.payload
    },
    languageEditng:(state,action)=>{
      const { id, updatedLang } = action.payload;
      // Find the index of the edc with the specified ID
      const eduIndex = state.marks.findIndex((ed) => ed._id.$oid === id);
      if (eduIndex !== -1) {
        // Update the edc at the found index with the updated data
        state.marks[eduIndex] = updatedLang;
      }
    }
    ,
    deleteLanguage:(state,action)=>{
      const id=action.payload;
      const filterItems=state.marks.filter(m=>m._id.$oid!==id);
      state.marks=filterItems;
    }
  },
})

// Action creators are generated for each case reducer function
export const { adding,languageEditng,setting,deleteLanguage} = languageSlice.actions

export default languageSlice.reducer