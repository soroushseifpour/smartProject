import React, { Fragment, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './Home.module.css'
import Work from '../Work/Work'
import Education from '../Education/Education'
import Language from '../Language/Laguage'
import { useSelector } from 'react-redux'
const Home = () => {
    const [activeItem, setActiveItem] = useState(null);
    const loader=useSelector(p=>p.loader).loader;
    
    const email=useSelector(u=>u.user.user).email;
    const toggleAccordionItem = (item) => {
        if (activeItem === item) {
            setActiveItem(null); // Close the item if it's already open
        } else {
            setActiveItem(item); // Open the clicked item
        }
    };
    return (
        <Fragment>
            <Navbar />
            {loader && <p>..loading</p>}
            {!loader && ( <div className={styles.homecontainer}>
                <div className={styles.homeleft}>
                    <div className={styles.homeleftcard}>
                        <div className={styles.firstrow}>
                            <h3 className={styles.header}>About Me</h3>
                            <button className={styles.btnedit}>Edit</button>
                        </div>
                        <h2 className='fw-bold'>{email}</h2>
                    </div>
                    <div className={styles.firstrow}>
                        <h3>Your Profile is Private</h3>
                        <p>
                            A private profile means employers cannot find you to reach out about opportunities. Your profile is only viewable as part of your applications
                        </p>
                    </div>
                    <div className={styles.homeleftcard}>
                        <div className={styles.firstrow}>
                            <h3 className={`${styles.header} fw-bold`}>Contact Information</h3>
                            
                        </div>
                        <p>{email}</p>
                    </div>
                </div>
                <div className={styles.homeright}>
                    <div className={styles.cardprofile}>
                        <div className={styles.cardprofilerigth}>
                            <h5>{email}</h5>
                            <p>Your profile is almost complete. Finish your profile to unlock better job matches and stand out</p>
                        </div>
                    </div>
                    <div id="accordion" style={{width:"100%"}}>
                        {/* Item 1 */}
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button
                                        className={`btn btn-link ${activeItem === 'item1' ? '' : 'collapsed'}`}
                                        onClick={() => toggleAccordionItem('item1')}
                                        style={{"textDecoration":"none","color":"black"}}
                                    >
                                        Work
                                    </button>
                                </h5>
                            </div>

                            <div
                                id="collapseOne"
                                className={`collapse ${activeItem === 'item1' ? 'show' : ''}`}
                                aria-labelledby="headingOne"
                                data-parent="#accordion"
                            >
                                <div className="card-body">
                                    <Work />
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                                <h5 className="mb-0">
                                    <button
                                        className={`btn btn-link ${activeItem === 'item2' ? '' : 'collapsed'}`}
                                        onClick={() => toggleAccordionItem('item2')}
                                        
                                        style={{"textDecoration":"none","color":"black"}}
                                    >
                                        Education
                                    </button>
                                </h5>
                            </div>
                            <div
                                id="collapseTwo"
                                className={`collapse ${activeItem === 'item2' ? 'show' : ''}`}
                                aria-labelledby="headingTwo"
                                data-parent="#accordion"
                            >
                                <div className="card-body">
                                    <Education />
                                </div>
                            </div>
                        </div>
                        {/* Item 4 */}
                        <div className="card">
                            <div className="card-header" id="headingFourth">
                                <h5 className="mb-0">
                                    <button
                                        className={`btn btn-link ${activeItem === 'item4' ? '' : 'collapsed'}`}
                                        onClick={() => toggleAccordionItem('item4')}
                                        
                                        style={{"textDecoration":"none","color":"black"}}
                                    >
                                        Language
                                    </button>
                                </h5>
                            </div>
                            <div
                                id="collapseFourth"
                                className={`collapse ${activeItem === 'item4' ? 'show' : ''}`}
                                aria-labelledby="headingFourth"
                                data-parent="#accordion"
                            >
                                <div className="card-body">
                                    <Language />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
           
        </Fragment>
    )
}
export default Home