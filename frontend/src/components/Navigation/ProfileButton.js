import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
    history.push('/');
  };

  const goToLocations = () => {
    history.push('/user-locations')
  };

  return (
    <>
      <button className='dropdown-btn' onClick={openMenu}>
        <i className="fas fa-bars fa-lg dropdown-icon" />
        <i className="fas fa-user-circle fa-lg dropdown-icon" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className='dropdown-group1'>
            <li className='dropdown-item'>{user.username}</li>
            <li className='dropdown-item'>{user.email}</li>
          </div>
          <hr/>
          <div className='dropdown-group2'>
            <li onClick={goToLocations} className='dropdown-item-square'>
              My Locations
            </li>
            <li onClick={logout} className='dropdown-item'>
              Log Out
            </li>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
