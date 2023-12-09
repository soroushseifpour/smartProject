import React, { useState } from 'react';
import styles from './EducationModal.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { adding, removing } from '../../store/educationSlice'
import {set} from '../../store/loadingSlice'
import axios from 'axios';
const EducationModal = () => {
  // Create state variables to hold the input data
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [start, setStart] = useState('');
  const [finish, setFinish] = useState('');
  const id=useSelector(u=>u.user.user).id;
  // const educations = useSelector((state) => state.education.educations)
  const dispatch = useDispatch()
  // Handle changes in input fields
  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  const handleFinishChange = (e) => {
    setFinish(e.target.value);
  };

  // Handle form submission or data saving
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can access the input data in the state variables (school, degree, major, start, finish)
    const data={
      id:id,
      school,
      degree,
      major,
      start,
      finish,
    }
    // Check if any of the fields are empty
    if (!degree || !school || !start || !finish || !major) {
      // Handle the case where any field is empty (e.g., show an error message)
     alert('Please fill in all fields');
      return; // Prevent further execution
    }
    dispatch(set(true));  
    axios.defaults.baseURL = 'http://127.0.0.1:5000';
    const response = await axios.post('/api/addeducation', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {status,code,_id} = response.data;
    if (code === 200 && status) {
      const educationId = _id;
      dispatch(adding({
        _id:{$oid:educationId},
        school,
        degree,
        major,
        start,
        finish,
      }))
      dispatch(set(false));  
    } 
    // You can perform further actions like sending the data to an API or updating state in a parent component.
  };

  return (
    <div className={styles.modalcontainer}>
      <h3>Education</h3>
      <div className={styles.inputcontainer}>
        <label>School</label>
        <input
          className={styles.input}
          type="text"
          placeholder="School"
          value={school}
          onChange={handleSchoolChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Degree</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Degree"
          value={degree}
          onChange={handleDegreeChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Major</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Major"
          value={major}
          onChange={handleMajorChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Start</label>
        <input
          className={styles.input}
          placeholder="Start Date"
          value={start}
          type="date"
          onChange={handleStartChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Finish</label>
        <input
          className={styles.input}
          placeholder="Finish Date"
          value={finish}
          type="date"
          onChange={handleFinishChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={(e)=>handleSubmit(e)}>
        Add Education
      </button>
    </div>
  );
};

export default EducationModal;
