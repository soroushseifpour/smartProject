import React, { useEffect } from 'react';
import {Fragment} from 'react'
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './Home/Home';
import educationSlice, {adding, setting} from '../src/store/educationSlice'
import {workSlice} from '../src/store/workSlice'
import {languageSlice} from '../src/store/languageSlice'
import {userSlice} from '../src/store/userSlice'
import { useDispatch } from 'react-redux';
function App() {
  const dispatch=useDispatch();
  useEffect(() => {
      // const user = localStorage.getItem('user');
      // const parsedUser = JSON.parse(user)
      // console.log(parsedUser)
      // if (parsedUser && !isLogin) {
      //   dispatch(userActions.seLogin(true))
        fetch('/fetchuser', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(p=>p.json()).then(i=>{
          console.log(i.response)
          dispatch(userSlice.actions.adding({name:i.response.user.name,id:i.response.user._id.$oid}))
          dispatch(setting(i.response.user.educations))
          dispatch(workSlice.actions.setting(i.response.user.works))
          dispatch(languageSlice.actions.adding(i.response.user.language))
          console.log(i.response.user.language)
        })
      // }
      // else if (!parsedUser) {
      //   dispatch(userActions.seLogin())
      // }
    }, [])
  return (
    <Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </Fragment>
  );
}

export default App;
