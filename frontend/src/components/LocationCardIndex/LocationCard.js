import React from 'react';
import { useHistory } from 'react-router-dom';

const LocationCard = ({ spot, image }) => {
  const shortLocation = spot.location.slice(0, 15) + '...';
  const history = useHistory();

  const editLocation = spotId => {
    history.push(`/edit-location/${spotId}`);
  };

  return (
    <div className='location-card' onClick={() => editLocation(spot.id)} >
      <img src={image.imageUrl || null} alt='location preview'/>
      <h3 className='location-card-title'>
        <span>{shortLocation}</span> 
        <span>{spot.price}$ / night</span>
      </h3>
    </div>
  );
}

export default LocationCard; 
