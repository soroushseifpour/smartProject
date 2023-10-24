import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:{
    },
    status:false,
    isLogin:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    adding: (state, action) => {
      state.user=action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    setLogin(state,action){
      state.isLogin=action.payload
   },
  },
})
export const userRegister = (user) => {
  return async (dispatch, getState) => {
      const response = await fetch('/adduser', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      })
      const { status, message } = await response.json()
  }
}
export const fetchUser=()=>{
  return async (dispatch,getState)=>{
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user)
      console.log(parsedUser)
      if (parsedUser && !getState().isLogin) {
        dispatch(setLogin(true))
        fetch('/fetchuser', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "username": parsedUser.username })
        }).then(p=>p.json()).then(i=>{
          console.log(i.response)
          dispatch(adding(i.response.user))
        })
      }
      else if (!parsedUser) {
        dispatch(setLogin())
      }
  }
}
// Action creators are generated for each case reducer function
export const { adding,setLogin,setStatus} = userSlice.actions

export default userSlice.reducer