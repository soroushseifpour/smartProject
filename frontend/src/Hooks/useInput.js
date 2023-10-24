import React, { useEffect, useReducer } from 'react'
const intialState={
    value:'',
    isTouched:false
}
const inputReducer=(state,action)=>{
    if(action.type==="SET_VALUE"){
        return{
            value:action.value,
            isTouched:true
        }
    }
    if(action.type==='CHANGED'){
        return{
            value:action.value,
            isTouched:true
        }
    }
    else if(action.type=="BLUR"){
        return{
            value:state.value,
            isTouched:action.value
        }
    }
    else if(action.type==="RESET"){
        return{
            value:'',
            isTouched:false
        }
    }
    else if(action.type==="SET_VALUE"){
        console.log(';')
        return{
            value:state.value,
            isTouched:false
        }
    }
    return state;
}
const useInput=(validation)=>{
    const [state, dispatch] = useReducer(inputReducer,intialState);
    const changeInputHandler=(value)=>{
        dispatch({type:"CHANGED",value:value})
    }
    const blurInputHandler=()=>{
        dispatch({type:"BLUR",value:true})
    }
    const resetValue=()=>{
        dispatch({type:"RESET"})
    }
    const isValid=validation(state.value) && state.isTouched;
    return{
        changeHanlder:changeInputHandler,
        blurHandler:blurInputHandler,
        value:state.value,
        isValid:isValid,
        isTouched:state.isTouched,
        resetValue:resetValue
    }
}
export default useInput