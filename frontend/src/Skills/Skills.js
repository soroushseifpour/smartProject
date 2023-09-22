import React, { useState } from 'react'
import styles from './Skills.module.css'
import Backdrop from '../Share/backdrop/Backdrop';
import SkillModal from '../Share/modal/SkillsModal';
import SkillsModalEdit from '../Share/modal/SkillsModalEdit';
const Skills=()=>{
    const [openbackdrop, setOpenbackdrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const backdropHandler=()=>{
        setOpenbackdrop(false);
        setOpenModal(false);
        setOpenModalEdit(false);
    }
    const modalHandler=()=>{
        setOpenbackdrop(true);
        setOpenModal(true);
    }
    const modalEditHandler=()=>{
        setOpenModalEdit(true)
        setOpenbackdrop(true);
    }
    return(
            <div className={styles.skills}>
                        <div className={styles.header}>
                                <h5 className='fw-bold'>Skills</h5>
                                <button className={styles.btnedit} onClick={modalEditHandler}>Edit</button>
                        </div>
                        <div className={styles.skillitemlist}>
                            <div className={styles.skillitem}>
                                Algorithms
                            </div>
                            <div className={styles.skillitem}>
                                Collaboration
                            </div>
                            <div className={styles.skillitem}>
                                Comminucation Skills
                            </div>
                            <div className={styles.skillitem}>
                                Data Structure
                            </div>
                        </div>
                        <button className={styles.btnAdd} onClick={modalHandler}>
                            Add Skills
                         </button>
                         {openbackdrop && <Backdrop onclick={backdropHandler}/>}
                         {openModal && <SkillModal/>}
                         {openModalEdit&& <SkillsModalEdit/>}
            </div>
    )
};
export default Skills