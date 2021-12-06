import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
