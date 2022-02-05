import { useSelector } from 'react-redux';

import LocationCard from './LocationCard';
import './LocationCardIndex.css';

// TODO: move this
interface Location {
  id: number,
  Images: Array<string>,
}

const LocationCardIndex = () => {
  const locations = useSelector(state => state.location.locations) || [];

  return (
    <div className='locations-container'>
      {locations.map((spot: Location) => ( 
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
