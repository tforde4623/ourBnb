import React from 'react';

const LocationCard = ({ spot, image }) => {

  return (
    <div className='location-card'>
      <h2>{spot.title}</h2>
      <img src={image.imageUrl} alt='location preview'/>
      <p>{spot.description}</p>
    </div>
  );
}

export default LocationCard; 
