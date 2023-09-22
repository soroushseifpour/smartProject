import React from 'react'
import styles from './Skills.module.css'
const SkillsModal=()=>{
    return(
        <div className={styles.modalcontainer}>
            <h3>Skills</h3>
            <div className={styles.inputconatiner}>
                <label>Skills</label>
                <input className={styles.input} type='text' placeholder='SKills' value="" />
            </div>
            <button className={styles.btnAdd}> Add Skills </button>
        </div>
    )
};
export default SkillsModal;