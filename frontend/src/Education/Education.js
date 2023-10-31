import React, { useState } from 'react'
import styles from './Education.module.css'
import Backdrop from '../Share/backdrop/Backdrop';
import EducationModal from '../Share/modal/EducationModal';
import EducationModalEdit from '../Share/modal/EducationModalEdit';
import { useSelector } from 'react-redux';
const Education = () => {
    const [openbackdrop, setOpenbackdrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [modalData, setModalData] = useState({});
    const educations = useSelector((state) => state.education.educations)
    const backdropHandler = () => {
        setOpenbackdrop(false);
        setOpenModal(false);
        setOpenModalEdit(false);
    }
    const modalHandler = async () => {
        setOpenbackdrop(true);
        setOpenModal(true);
    }
    const EducationlEditHandler = (id) => {
        const data=educations.find(p=>p._id.$oid===id)
        setModalData(data);
        setOpenbackdrop(true);
        setOpenModalEdit(true);
    }
    return (
        <div className={styles.education}>
            <h3 className='fw-bold'>Education</h3>
            {educations.map((e,index) => {
                return (
                    <div className={styles.working} key={e._id.$oid}>
                        <div className={styles.header}>
                            <h5 className='fw-bold'>{e.school}</h5>
                            <button className={styles.btnedit} onClick={()=>EducationlEditHandler(e._id.$oid)}>Edit</button>
                        </div>
                        <p>{e.degree} of {e.major}</p>
                        <small>{e.start}- {e.finish}</small>
                    </div>
                )
            })}
            <button className={styles.btnAdd} onClick={modalHandler}>
                Add Education
            </button>
            {openbackdrop && <Backdrop onclick={backdropHandler} />}
            {openModal && <EducationModal />}
            {openModalEdit && <EducationModalEdit data={modalData} backdropHandler={backdropHandler}/>}
        </div>
    )
}
export default Education;