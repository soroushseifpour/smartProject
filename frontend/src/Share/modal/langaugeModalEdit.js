import React, { useState } from 'react';
import styles from './LanguageModalEdit.module.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {deleteLanguage, languageEditng} from '../../store/languageSlice'
const LanguageModalEdit = ({ data,backdropHandler}) => {
  // Initialize state for input values
  console.log(data)
  const [values, setValues] = useState(data || {});
  const dispatch=useDispatch();
  const id=useSelector(u=>u.user.user).id;
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onSave = async (values) => {
    //...saving values
    const newLanguageSkill = {
        id:id,
        _id:data._id.$oid,
        title:values.title,
        listening: values.listening,
        reading: values.reading,
        writing: values.writing,
        speaking: values.speaking,
        finalmark: values.finalmark,
    };
    const { listening, reading, writing, speaking, finalmark } = newLanguageSkill;
    if (!listening || !reading || !writing || !speaking || !finalmark) {
        // Handle the case where any field is empty (e.g., show an error message)
       alert('Please fill in all fields');
        return; // Prevent further execution
    }
    
    axios.defaults.baseURL = 'https://smart-api-32fb.onrender.com';
    const response = await axios.put('/api/editlanguage', newLanguageSkill, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
    const {status,code} = response.data;
      if (code === 200 && status) {
      dispatch(languageEditng({id:data._id.$oid,updatedLang:newLanguageSkill}));
      backdropHandler();
      }
    }   
    const deleteHandler= async(itemid)=>{
      
      axios.defaults.baseURL = 'https://smart-api-32fb.onrender.com';
      const response=await axios.delete(`/api/users/${id}/languages/${itemid}`)
      console.log(response);
      backdropHandler()
      dispatch(deleteLanguage(itemid))
    }
  // Handle the "Add" button click
  const handleAddClick = (e) => {
    onSave(values);
  };
  return (
    <div className={styles.modalcontainer}>
      <h3>Language</h3>
      <div className={styles.inputcontainer}>
        <label>Title</label>
        <input
          className={styles.input}
          type='text'
          name='title'
          placeholder='title'
          value={values.title || ''}
          onChange={handleInputChange}
        />
        <label>Listening</label>
        <input
          className={styles.input}
          type='number'
          name='listening'
          placeholder='Listening'
          value={values.listening || ''}
          onChange={handleInputChange}
        />
        <label>Reading</label>
        <input
          className={styles.input}
          type='number'
          name='reading'
          placeholder='Reading'
          value={values.reading || ''}
          onChange={handleInputChange}
        />
        <label>Writing</label>
        <input
          className={styles.input}
          type='number'
          name='writing'
          placeholder='Writing'
          value={values.writing || ''}
          onChange={handleInputChange}
        />
        <label>Speaking</label>
        <input
          className={styles.input}
          type='number'
          name='speaking'
          placeholder='Speaking'
          value={values.speaking || ''}
          onChange={handleInputChange}
        />
        <label>Final Mark</label>
        <input
          className={styles.input}
          type='number'
          name='finalmark'
          placeholder='Final Mark'
          value={values.finalmark || ''}
          onChange={handleInputChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={(e)=>handleAddClick(e)}>
        Add
      </button>
      
      <button className={styles.btnDelete} onClick={()=>deleteHandler(data._id.$oid)}>
        Delete
      </button>
    </div>
  );
};
export default LanguageModalEdit;
