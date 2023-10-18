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
        // const data={
        //     'position':"Software developer(Internship)",
        //     'company':"Smart immigration",
        //     'start':"Feb 2023",
        //     'end':'Agu 2023',
        //     'duties':
        //         'Develop a console application using C++ and a file system manager using Heap Tree and LinkedList to manage files based on the different categories by collaborating with a team of 3 people.Using LinkedList and data structures in C++ to manage almost 100 text file from different universities after doing web scraping'
        // }
        const data=works.find(p=>p.id.$oid===id);
        // console.log(data)
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
                    <div className={styles.working} key={w.id.$oid}>
                    <div className={styles.header}>
                        <h5 className='fw-bold'>{w.position}</h5>
                        <button className={styles.btnedit} onClick={()=>workeditHandler(w.id.$oid)}>Edit</button>
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