import React, { useState } from 'react'
import styles from './Work.module.css'
import Backdrop from '../Share/backdrop/Backdrop';
import WorkModal from '../Share/modal/WorkModal';
import WorkModalEdit from '../Share/modal/WorkModalEdit';
import { useSelector, useDispatch } from 'react-redux'
const Work=()=>{
    const [openbackdrop, setOpenbackdrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const works = useSelector((state) => state.work.works)
    console.log(works)
    const dispatch = useDispatch()
    const backdropHandler=()=>{
        setOpenbackdrop(false);
        setOpenModal(false);
        setOpenEditModal(false);
    }
    const modalHandler=()=>{
        setOpenbackdrop(true);
        setOpenModal(true);
    }
    const modalEditHandler=()=>{
        setOpenbackdrop(true);
        setOpenEditModal(true);
    }
    const workeditHandler=(id)=>{
        const data=works.find(p=>p._id.$oid===id);
        setModalData(data);
        modalEditHandler();
    }
    return(
    <div className={styles.summarycard}>
        <h3 className='fw-bold'>Work Expereice</h3>
        {works === undefined && <p>Loading...</p>}
        {works !== undefined && works.length === 0 && <p>No work experience available.</p>}
        {works.length>0 && (
            works.map((w,index)=>{
                return(
                    <div className={styles.working} key={w._id.$oid}>
                    <div className={styles.header}>
                        <h5 className='fw-bold'>{w.position}</h5>
                        <button className={styles.btnedit} onClick={()=>workeditHandler(w._id.$oid)}>Edit</button>
                    </div>
                    <p>{w.company}</p>
                    <small>{w.start}- {w.end}</small>
                    <ul className={styles.downlist}>
                        {w.duties.split('.').map(d=>{
                            return(
                                <il className={styles.downlistItem}>{d}</il>
                            )
                        })}
                    </ul>
                </div>
                )
            })
        )}
         <button className={styles.btnAdd} onClick={modalHandler}>
            Add Work Expereice
         </button>
         {openbackdrop && <Backdrop onclick={backdropHandler}/>}
         {openModal&& <WorkModal/>}
         {openEditModal&& <WorkModalEdit data={modalData}/>}
    </div>
    )
};
export default Work