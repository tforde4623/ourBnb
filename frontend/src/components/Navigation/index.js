import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const [searchVisible, setSearchVisible] = useState(false); // may change default to persist

  // const openSearch = () => {
  //   if (searchVisible) return;
  //   // future funtionality
  //   // setSearchVisible(true);
  // } 

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
        <NavLink className='signup' to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul className='nav-container'>
      <li className='nav-link'>
        <NavLink className='title-nav' exact to="/"><i className="fas fa-bullseye"></i>urbnb</NavLink>
      </li>
      <li /* onClick={openSearch} */ className='nav-link nav-places-search'>
        <p>
          <NavLink 
            className={isActive => `nav-places-search ${isActive ? 'nav-active' : null}`}
            to='/any-location'>
              Places To Stay
          </NavLink>
        </p>
        { /* future implementation */}
        {/* searchVisible && (
          <input
            className='nav-link searchbar-popup'
            placeholder='choose a location!'
          ></input>
        ) */}
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
