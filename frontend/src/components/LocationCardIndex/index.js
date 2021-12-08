import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LocationCard from './LocationCard';
import './LocationCardIndex.css';
import { getLocations } from '../../store/locations';

const LocationCardIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch]);

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

export default LocationCardIndex;
