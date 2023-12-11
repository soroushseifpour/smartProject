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
import axios from 'axios';
import Test from './Test/Test';
function App() {
  const dispatch=useDispatch();
  const loader=useSelector(p=>p.loader).loader;
  const isLogin = useSelector(p => p.user).isLogin;
  useEffect(() => {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user)
      if (parsedUser && !isLogin) {
      dispatch(setLogin(true))
      dispatch(set(true));
      const email={email:parsedUser.email}
      axios.defaults.baseURL = 'http://127.0.0.1:5000';
      axios.post('/api/fetchuser', email, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res=>{
        const i=res.data
        console.log(i)
        dispatch(userSlice.actions.adding({email:i.response.user.email,id:i.response.user._id.$oid,status:i.response.user.status,date:i.response.user.date}))
        dispatch(setting(i.response.user.educations || []))
        dispatch(workSlice.actions.setting(i.response.user.works || []))
        dispatch(languageSlice.actions.setting(i.response.user.languages || []))
      });
        dispatch(set(false));
      }
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
          <Route path="/test" element={<Test/>}/>
        </Routes>
    </Fragment>
  );
}

export default App;
