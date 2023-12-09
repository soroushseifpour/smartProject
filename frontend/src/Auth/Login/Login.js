import React, { useState } from 'react';
import styles from './Login.module.css';
import useInput from '../../Hooks/useInput'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adding, setLogin } from '../../store/userSlice';
import { set } from '../../store/loadingSlice';
import axios from 'axios'
import { setting } from '../../store/educationSlice';
import {workSlice} from '../../store/workSlice';
import {languageSlice} from '../../store/languageSlice';
const Login = () => {
    const isEmailValid = (value) => {
        // Use a regular expression to check for a basic email format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
      };
      
    const {
        blurHandler: emailBlurHandler,
        changeHanlder: emailChangeHanldler,
        isTouched: emailIsTouchd,
        isValid: emailIsValid,
        resetValue: emailResetValue,
        value: emailValue
    } = useInput(isEmailValid);

    const {
        blurHandler: passwordBlurHandler,
        changeHanlder: passwordChangeHanldler,
        isTouched: passwordIsTouchd,
        isValid: passwordIsValid,
        resetValue: passwordResetValue,
        value: passwordValue
    } = useInput((value) => value.trim().length > 5)
    const reset = () => {
        emailResetValue();
        passwordResetValue();
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(p => p.loader).loader
    const formIsvalid = passwordIsValid && emailIsValid;
    const formHandler = async(e) => {
        e.preventDefault()
        const u = {
            email: emailValue,
            password: passwordValue
        }
        if (formIsvalid) {
          axios.defaults.baseURL = 'https://smart-api-32fb.onrender.com';
          const response = await axios.post('/api/login', u, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = response.data;
          console.log(data)
            if (data.response.status) {
                const data = response.data;
                localStorage.setItem('user',JSON.stringify({email:data.response.user.email,password:data.response.user.password,id:data.response.user._id.$oid}))
                dispatch(adding({email:data.response.user.email,password:data.response.user.password,id:data.response.user._id.$oid}))
                dispatch(setting(data.response.user.educations || []))
                dispatch(workSlice.actions.setting(data.response.user.works || []))
                dispatch(languageSlice.actions.setting(data.response.user.languages || []))
                dispatch(setLogin(true))
                reset();
                dispatch(set(false));
                navigate('/', { state: { message: data.response.message }, replace: true })
              }
              else {
                dispatch(setLogin(false))
                alert("The inputs are not valid")
                reset();
            }
        }
        else{
          alert('The inputs are not valid.')
        }
    }
    return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={formHandler}>
        <h2 className={styles.formHeader}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={(e) => emailChangeHanldler(e.currentTarget.value)} 
            onBlur={emailBlurHandler} name="email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={(e) => passwordChangeHanldler(e.target.value)}
            onBlur={passwordBlurHandler} name="email"
            required
          />
         {passwordIsTouchd && !passwordIsValid && <span style={{color:"red"}}>The length must be greater than 5</span>}
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      <p>Have no accout? <Link to="/Signup">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
