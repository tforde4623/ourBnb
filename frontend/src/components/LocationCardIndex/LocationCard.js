import React from 'react';

const LocationCard = ({ spot, image }) => {
  const shortLocation = spot.location.slice(0, 15) + '...';

  return (
    <div className='location-card' >
      <img src={image.imageUrl || null} alt='location preview'/>
      <h3 className='location-card-title'>
        <span>{shortLocation}</span> 
        <span>{spot.price}$ / night</span>
      </h3>
    </div>
  );
}

export default LocationCard; 
