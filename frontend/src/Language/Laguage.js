import React, { Fragment, useEffect, useState } from 'react'
import styles from './Language.module.css'
import Backdrop from '../Share/backdrop/Backdrop';
import LanguageModal from '../Share/modal/LanguageModal';
import { useDispatch, useSelector } from 'react-redux';
import { adding } from '../store/languageSlice';
import axios from 'axios';
import LanguageModalEdit from '../Share/modal/langaugeModalEdit';
const Language = () => {
    const [openbackdrop, setOpenbackdrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [modalData, setModalData] = useState({});
    const languages = useSelector((state) => state.language.marks)
    const backdropHandler = () => {
        setOpenbackdrop(false);
        setOpenModal(false);
        setOpenModalEdit(false);
    }
    const modalHandler = async () => {
        setOpenbackdrop(true);
        setOpenModal(true);
    }
    const languageEditHandler = (id) => {
        const data = languages.find(p => p._id.$oid === id)
        setModalData(data);
        setOpenbackdrop(true);
        setOpenModalEdit(true);
    }
    return (
        <div className={styles.skills}>
            <h3>Language</h3>
            {languages.map((language, index) => {
                return (
                    <div key={index}>
                        <div className={styles.header}>
                            <h5 className='fw-bold'>{language.title}</h5>
                            <button className={styles.btnedit} onClick={() => languageEditHandler(language._id.$oid)}>Edit</button>
                        </div>
                        <h6>Final Mark : {language.finalmark}</h6>
                        <div className={styles.skillitemlist}>
                            <div className={styles.skillitem}>
                                Reading : {language.reading}
                            </div>
                            <div className={styles.skillitem}>
                                Listening : {language.listening}
                            </div>
                            <div className={styles.skillitem}>
                                Speaking : {language.speaking}
                            </div>
                            <div className={styles.skillitem}>
                                Writing : {language.writing}
                            </div>
                        </div>
                    </div>
                )
            })}
                <button className={styles.btnAdd} onClick={modalHandler}>
                    Add Language
                </button>
            {openbackdrop && <Backdrop onclick={backdropHandler} />}
            {openModal && <LanguageModal />}
            {openModalEdit && <LanguageModalEdit data={modalData} backdropHandler={backdropHandler} />}
        </div>
    )
};
export default Language