import React, { useEffect } from 'react';
import {Fragment} from 'react'
import './App.css';
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './Home/Home';
import educationSlice, {adding, setting} from '../src/store/educationSlice'
import {workSlice} from '../src/store/workSlice'
import {languageSlice} from '../src/store/languageSlice'
import {setLogin, userSlice} from '../src/store/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import {set} from './store/loadingSlice'
import Login from './Auth/Login/Login';
import Signup from './Auth/Signup/Signup';
function App() {
  const dispatch=useDispatch();
  const loader=useSelector(p=>p.loader).loader;
  const isLogin = useSelector(p => p.user).isLogin;
  useEffect(() => {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user)
      console.log(parsedUser,isLogin)
      if (parsedUser && !isLogin) {
      dispatch(setLogin(true))
      dispatch(set(true));
      const data={email:parsedUser.email}
      console.log(data)
        fetch('/fetchuser', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
          ,
          body:JSON.stringify(data)
        }).then(p=>p.json()).then(i=>{
          // console.log(i.response)
          dispatch(userSlice.actions.adding({email:i.response.user.email,id:i.response.user._id.$oid}))
          dispatch(setting(i.response.user.educations || []))
          dispatch(workSlice.actions.setting(i.response.user.works || []))
          dispatch(languageSlice.actions.adding(i.response.user.language || {}))
        })
        dispatch(set(false));
      }
      // else if (!parsedUser) {
      //   dispatch(userActions.seLogin())
      // }
    }, [loader])
  return (
    <Fragment>
        <Routes>
          {isLogin && <Route path="/" element={<Home/>}/>}
          {!isLogin && <Route path="/"  element={<Navigate to="/login" />}/>}
          {isLogin && <Route path="/login"  element={<Navigate to="/" />}/>}
          {isLogin && <Route path="/Signup" element={<Navigate to="/" />}/>}
          {!isLogin && <Route path="/login" element={<Login/>}/>}
          {!isLogin && <Route path="/Signup" element={<Signup/>}/>}
        </Routes>
    </Fragment>
  );
}

export default App;
