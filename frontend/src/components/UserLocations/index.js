import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LocationCard from '../LocationCardIndex/LocationCard';
import '../LocationCardIndex/LocationCardIndex.css';
import { getUserLocations } from '../../store/locations';

const UserLocations = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getUserLocations(sessionUser.id))
  }, [dispatch, sessionUser]);

  const locations = useSelector(state => state.location.locations) || [];

  return (
    <div className='locations-container'>
    {locations.map(spot => ( 
      <LocationCard 
        image={spot.Images[0]} 
        spot={spot}
        key={spot.id}
      />
    ))}
    </div>
  );
}

export default UserLocations;


