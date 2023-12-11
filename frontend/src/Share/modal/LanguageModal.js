import React, { useState } from 'react';
import styles from './LanguageModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { set } from '../../store/loadingSlice';
import { adding } from '../../store/languageSlice';

const LanguageModal = () => {
  // Initialize state for input values
  const [title, setTilte] = useState('');
  const [listening, setListening] = useState('');
  const [reading, setReading] = useState('');
  const [writing, setWriting] = useState('');
  const [speaking, setSpeaking] = useState('');
  const [finalmark, setFinalmark] = useState('');
  const dispatch = useDispatch();
  const id = useSelector(u => u.user.user).id;
  // Handle input changes
  // Handle changes in input fields
  const handleListeningChange = (e) => {
    setListening(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTilte(e.target.value);
  };

  const handleReadingChange = (e) => {
    setReading(e.target.value);
  };

  const handleWrittingChange = (e) => {
    setWriting(e.target.value);
  };

  const handleSpeakingChange = (e) => {
    setSpeaking(e.target.value);
  };

  const handleFinalmarkChange = (e) => {
    setFinalmark(e.target.value);
  };
  // Handle the "Add" button click
  const handleAddClick = async (e) => {
    e.preventDefault();
    // Here, you can access the input data in the state variables (school, degree, major, start, finish)
    const newLanguageSkill = {
      id: id,
      title,
      listening,
      reading,
      writing,
      speaking,
      finalmark,
    };
    // Check if any of the fields are empty
    if (!title || !listening || !reading || !writing || !speaking || !finalmark) {
      // Handle the case where any field is empty (e.g., show an error message)
      alert('Please fill in all fields');
      return; // Prevent further execution
    }
    dispatch(set(true));
    console.log(newLanguageSkill)
    axios.defaults.baseURL = 'http://localhost:5000';
    const response = await axios.post('/api/addlanguage',newLanguageSkill,  {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, code, _id } = response.data;
    if (code === 200 && status) {
      const languageId = _id;
      dispatch(adding({
        _id: { $oid: languageId },
        title,
        listening,
        reading,
        writing,
        speaking,
        finalmark,
      }))
      dispatch(set(false));
    }
  }
  return (
    <div className={styles.modalcontainer}>
      <h3>Language</h3>
      <div className={styles.inputcontainer}>
        <label>Title</label>
        <input
          className={styles.input}
          type='text'
          name='title'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
        />
        <label>Listening</label>
        <input
          className={styles.input}
          type='number'
          name='listening'
          placeholder='Listening'
          value={listening}
          onChange={handleListeningChange}
        />
        <label>Reading</label>
        <input
          className={styles.input}
          type='number'
          name='reading'
          placeholder='Reading'
          value={reading}
          onChange={handleReadingChange}
        />
        <label>Writing</label>
        <input
          className={styles.input}
          type='number'
          name='writing'
          placeholder='Writing'
          value={writing}
          onChange={handleWrittingChange}
        />
        <label>Speaking</label>
        <input
          className={styles.input}
          type='number'
          name='speaking'
          placeholder='Speaking'
          value={speaking}
          onChange={handleSpeakingChange}
        />
        <label>Final Mark</label>
        <input
          className={styles.input}
          type='number'
          name='finalmark'
          placeholder='Final Mark'
          value={finalmark}
          onChange={handleFinalmarkChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={(e) => handleAddClick(e)}>
        Add
      </button>
    </div>
  );
};

export default LanguageModal;
