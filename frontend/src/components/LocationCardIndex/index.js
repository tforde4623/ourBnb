import React from 'react';
import { useSelector } from 'react-redux';

import LocationCard from './LocationCard';
import './LocationCardIndex.css';

const LocationCardIndex = () => {
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
