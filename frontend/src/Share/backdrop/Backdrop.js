import React from 'react'
import styles from './Backdrop.module.css'
const Backdrop=(props)=>{
    return(
        <div className={styles.container} onClick={props.onclick}>

        </div>
    )
};
export default Backdrop