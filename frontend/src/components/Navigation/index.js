import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [searchVisible, setSearchVisible] = useState(false); // may change default to persist

  const openSearch = () => {
    if (searchVisible) return;
    setSearchVisible(true);
  } 

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  // TODO: put login/signup stuff in a drop down
  return (
    <ul className='nav-container'>
      <li className='nav-link'>
        <NavLink exact to="/">ourbnb</NavLink>
      </li>
      <li onClick={openSearch} className='nav-link nav-places-search'>
        Places to stay
        {searchVisible && (
          <input
            className='nav-link searchbar-popup'
            placeholder='choose a location!'
          ></input>
        )}
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
