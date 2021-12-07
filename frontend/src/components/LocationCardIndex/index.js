import React, { useState, useEffect } from 'react';

import LocationCard from './LocationCard';
import './LocationCardIndex.css';

// figure out where to put this (if you need it along with the search)
// maybe throw it in an "experience" page, i'm not sure itll be the home page
// or like an all places... idk yet look at the actual website
const LocationCardIndex = () => {
  const [locations, setLocations] = useState([]);
  // change this to a thunk if they want 
  // (though idk why they would since we won't need this exact data anywhere else)
  // or the "im flexible" (i'm not sure where to go) page
  useEffect(() => {
    async function fetchLocations() {
      const locations = await fetch('/api/locations');
      const res = await locations.json();
      setLocations(res);
    }

    fetchLocations();
  }, [setLocations]);

  return (
    <div>
    {locations.map(spot => ( 
      <LocationCard image={spot.Images[0]} spot={spot}/>
    ))}
    </div>
  );
}

export default LocationCardIndex;
