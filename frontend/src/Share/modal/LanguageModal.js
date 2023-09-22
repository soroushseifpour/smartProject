import React, { useState } from 'react';
import styles from './LanguageModal.module.css';

const LanguageModal = ({ initialValues, onSave }) => {
  // Initialize state for input values
  const [values, setValues] = useState(initialValues || {});

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Handle the "Add" button click
  const handleAddClick = () => {
    onSave(values);
    // Clear the input values after saving
    setValues({});
  };

  return (
    <div className={styles.modalcontainer}>
      <h3>Language</h3>
      <div className={styles.inputcontainer}>
        <label>Listening</label>
        <input
          className={styles.input}
          type='number'
          max={"9"}
          name='listening'
          placeholder='Listening'
          value={values.listening || ''}
          onChange={handleInputChange}
        />
        <label>Reading</label>
        <input
          className={styles.input}
          type='number'
          max={"9"}
          name='reading'
          placeholder='Reading'
          value={values.reading || ''}
          onChange={handleInputChange}
        />
        <label>Writing</label>
        <input
          className={styles.input}
          type='number'
          max={"9"}
          name='writing'
          placeholder='Writing'
          value={values.writing || ''}
          onChange={handleInputChange}
        />
        <label>Speaking</label>
        <input
          className={styles.input}
          type='number'
          max={"9"}
          name='speaking'
          placeholder='Speaking'
          value={values.speaking || ''}
          onChange={handleInputChange}
        />
        <label>Final Mark</label>
        <input
          className={styles.input}
          type='number'
          max={"9"}
          name='finalMark'
          placeholder='Final Mark'
          value={values.finalMark || ''}
          onChange={handleInputChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={handleAddClick}>
        Add
      </button>
    </div>
  );
};

export default LanguageModal;
