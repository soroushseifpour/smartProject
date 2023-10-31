import React, { useState } from 'react';
import styles from './Signup.module.css';
import useInput from '../../Hooks/useInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const Signup = () => {
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
    const formHandler = async (e) => {
        e.preventDefault()
        const user = {
            email: emailValue,
            password:passwordValue
        }
        if (formIsvalid) {
          const response = await axios.post('/signup', user, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const {status,message} = response.data;
            if(status){
                alert(message);
                navigate('/login',{state:{message:"successfully register"},replace:true})
            }
            else{
                alert(message);
            }
        }
        else{
          alert("The inputs are not valid")
        }
    }
    return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={formHandler}>
        <h2 className={styles.formHeader}>Singup</h2>
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
        </div>
        <button type="submit" className={styles.loginButton}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
