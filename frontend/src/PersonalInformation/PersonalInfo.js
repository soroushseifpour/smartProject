import React, { useState } from 'react'
import styles from './PersonalInfo.module.css'
import Backdrop from '../Share/backdrop/Backdrop';
import PersonalInfoEditModal from '../Share/modal/PersonalInfoEditModal';
import { useSelector } from 'react-redux';
const PersonalInfo=()=>{
    const [openbackdrop, setOpenbackdrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const user = useSelector(u => u.user.user);
    const backdropHandler = () => {
        setOpenbackdrop(false);
        setOpenModal(false);
        setOpenModalEdit(false);
    }
    const modalHandler = async () => {
        setOpenbackdrop(true);
        setOpenModal(true);
        setOpenModalEdit(true);
    }
    return(
        <div>
            <h3>Personal Information</h3>
            <p>Mariage Status: {user.status ? user.status : ''}</p>
            <p>Birthday: {user.date ? user.date : ""}</p>
            <button className={styles.btnAdd} onClick={modalHandler}>
                    Add Info
                </button>
            {openbackdrop && <Backdrop onclick={backdropHandler} />}
            {openModalEdit && <PersonalInfoEditModal backdropHandler={backdropHandler} />}
        </div>
    )
}
export default PersonalInfo;