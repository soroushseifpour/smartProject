import React, { useEffect, useState } from 'react'
import styles from './Language.module.css'
import Backdrop from '../Share/backdrop/Backdrop';
import LanguageModal from '../Share/modal/LanguageModal';
import { useDispatch, useSelector } from 'react-redux';
import { adding } from '../store/languageSlice';
const Language = () => {
    const [openbackdrop, setOpenbackdrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [languageSkills, setLanguageSkills] = useState({});
    const language = useSelector((state) => state.language.marks);
    const dispatch=useDispatch();
    const id=useSelector(u=>u.user.user).id;
    
    useEffect(() => {
        setLanguageSkills(language)
    }, [])
    const onSave = async (values) => {
        //...saving values
        const newLanguageSkill = {
            id:id,
            listening: values.listening,
            reading: values.reading,
            writing: values.writing,
            speaking: values.speaking,
            finalmark: values.finalmark,
        };
        console.log(newLanguageSkill);
        const response = await fetch("/editlanguage", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLanguageSkill)
        })
        const result = await response.json();
        console.log(result);
        // Update the languageSkills state with the new skill
        setLanguageSkills(newLanguageSkill);
        dispatch(adding(newLanguageSkill));
        // Close the modal and backdrop
        setOpenbackdrop(false);
        setOpenModalEdit(false);

    }
    const backdropHandler = () => {
        setOpenbackdrop(false);
        setOpenModal(false);
        setOpenModalEdit(false);
    }
    const modalEditHandler = () => {
        setOpenModalEdit(true)
        setOpenbackdrop(true);
    }
    return (
        <div className={styles.skills}>
            <div className={styles.header}>
                <h5 className='fw-bold'>Language</h5>
                <button className={styles.btnedit} onClick={modalEditHandler}>Edit</button>
            </div>
            <h6>Final Mark : {language.finalmark}</h6>
            <div className={styles.skillitemlist}>
                <div className={styles.skillitem}>
                    Reading : {language.reading}
                </div>
                <div className={styles.skillitem}>
                    Listenign : {language.listening}
                </div>
                <div className={styles.skillitem}>
                    Speaking : {language.speaking}
                </div>
                <div className={styles.skillitem}>
                    Writing : {language.writing}
                </div>
            </div>
            {openbackdrop && <Backdrop onclick={backdropHandler} />}
            {openModalEdit && <LanguageModal initialValues={language} onSave={onSave} />}
        </div>
    )
};
export default Language