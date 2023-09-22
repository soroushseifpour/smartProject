import React from 'react';
import {Fragment} from 'react'
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './Home/Home';
function App() {
  return (
    <Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </Fragment>
  );
}

export default App;
