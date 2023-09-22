import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
const Navbar=()=>{
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 w-100 shadow-sm  mb-5 bg-white rounded" style={{"zIndex":100}}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">    
        <Link className="navbar-brand" href="#">Smart Immigration</Link>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
    )
};
export default Navbar