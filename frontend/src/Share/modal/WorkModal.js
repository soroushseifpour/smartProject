import React, { useState } from 'react';
import styles from './WorkModal.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { adding, removing } from '../../store/workSlice'
const WorkModal = () => {
  const works = useSelector((state) => state.work.works)
  const id=useSelector(u=>u.user.user).id;
  const dispatch = useDispatch()
  // Create a state variable to hold the form data
  const [formData, setFormData] = useState({
    id:id,
    position: '',
    company: '',
    start: '',
    end: '',
    duties:'',
  });

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the changed value
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Here, you can access the formData object, which contains the updated values
    console.log(formData);

    const response= await fetch("/addwork",{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const result= await response.json();
    
    dispatch(adding(formData));
    // You can perform further actions like sending the data to an API or updating state in a parent component.
  };

  return (
    <div className={styles.modalcontainer}>
      <h3>Work Experience</h3>
      <div className={styles.inputcontainer}>
        <label>Job Title</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Job Title"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Company</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Start</label>
        <input
          className={styles.input}
          placeholder="Company"
          name="start"
          value={formData.start}
          type="date"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Finish</label>
        <input
          className={styles.input}
          placeholder="Company"
          name="end"
          value={formData.end}
          type="date"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Description</label>
        <textarea
          name="duties"
          value={formData.duties}
          onChange={handleInputChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={handleSubmit}>
        Add Work
      </button>
    </div>
  );
};

export default WorkModal;
