import React, { useState } from 'react';
import styles from './SkillsModalEdit.module.css';

const SkillModalEdit = () => {
  // Initialize state to hold the skills data
  const [skills, setSkills] = useState(['Algorithms', 'Collaboration', 'Communication Skills', 'Data Structure']);
  
  // Handle changes in skill values
  const handleSkillChange = (index, newValue) => {
    // Create a copy of the skills array
    const updatedSkills = [...skills];
    // Update the value at the specified index
    updatedSkills[index] = newValue;
    // Update the skills state with the new array
    setSkills(updatedSkills);
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    // Create a copy of the skills array
    const updatedSkills = [...skills];
    // Add an empty string as a new skill
    updatedSkills.push('');
    // Update the skills state with the new array
    setSkills(updatedSkills);
  };

  // Handle removing a skill
  const handleRemoveSkill = (index) => {
    // Create a copy of the skills array
    const updatedSkills = [...skills];
    // Remove the skill at the specified index
    updatedSkills.splice(index, 1);
    // Update the skills state with the new array
    setSkills(updatedSkills);
  };

  return (
    <div className={styles.modalcontainer}>
      <h3>Skills</h3>
      {skills.map((skill, index) => (
        <div key={index} className={styles.inputcontainer}>
          <label>Skill {index + 1}</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveSkill(index)} className={styles.remove}>Remove</button>
        </div>
      ))}
      <button className={styles.btnAdd} onClick={handleAddSkill} >
        Add Skill
      </button>
    </div>
  );
};

export default SkillModalEdit;
