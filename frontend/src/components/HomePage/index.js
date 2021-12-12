import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const HomePage = () => {
  return (
    <div className='homepage-content'>
      <div className='main-photo'>
        <img 
          className='homepage-photo-main'
          alt='home page reference photo' 
          src='https://images.unsplash.com/photo-1507961455425-0caef37ef6fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'/>
        <p className='main-caption'>Plan your next adventure!</p>
        <Link 
          className='main-link'
          to='/any-location'>Find a Place!</Link>
      </div>
    </div>
  );
}

export default HomePage;
