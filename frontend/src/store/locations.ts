import { csrfFetch } from './csrf';
import { Dispatch } from 'redux';

// typescript stuff

// TODO move to types file
enum LocationActionTypes {
  SET_LOCATIONS = 'locations/get',
  EDIT_LOCATION = 'locations/edit',
  DELETE_LOCATION = 'locations/delete'
}

interface Image {
  imageUrl: string
}

// TODO
interface Location {
  id: number,
  title: string,
  description: string,
  location: string,
  price: number,
  Images: Array<Image>
}

interface SetLocations {
  type: LocationActionTypes.SET_LOCATIONS,
  payload: Array<Location>
}

interface EditLocation {
  type: LocationActionTypes.EDIT_LOCATION,
  payload: Location
}

interface RemoveLocation {
  type: LocationActionTypes.DELETE_LOCATION,
  payload: number
}

type Action = SetLocations | EditLocation | RemoveLocation;

interface LocationState {
  locations: Array<Location>
}

// action objects
export const setLocations = (locations: Array<Location>) => {
  return {
    type: LocationActionTypes.SET_LOCATIONS,
    locations
  }
};


export const editLocation = (locationAttrs: Location) => {
  return {
    type: LocationActionTypes.EDIT_LOCATION,
    locationAttrs
  }
};


export const removeLocation = (id: number) => {
  return {
    type: LocationActionTypes.DELETE_LOCATION,
    id
  }
};

// thunk for getting bulk (random) locations
export const getLocations = () => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch('/api/locations');
    const locations = await res.json();
    dispatch(setLocations(locations));
    return locations;
  };
} 

export const getUserLocations = (userId: number) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/locations`);
    const locations = await res.json();
    dispatch(setLocations(locations));
    return locations;
  };
}

export const updateLocation = (data: Location) => {
  return async (dispatch: Dispatch) => {
    const { id, title, description, location, price } = data;
    const res = await csrfFetch(`/api/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        location,
        price: price,
        image: data.Images[0].imageUrl
      })
    })

    if (res.ok) {
      dispatch(editLocation(data))
      return data;
    }
  }
} 


export const deleteLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch(`/api/locations/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      dispatch(removeLocation(id));
      return;
    }
  };
}

const initialState = { locations: [] };

const locationReducer = (state: LocationState = initialState, action: Action) => {
  let newState: LocationState;
  switch(action.type) {
    case LocationActionTypes.SET_LOCATIONS: {
      newState = Object.assign({}, state);
      newState.locations = action.payload;
      return newState;
  }

    case LocationActionTypes.EDIT_LOCATION: {
      newState = Object.assign({}, state);
      const newStateArr = newState.locations.filter(location => +location.id !== +action.payload.id);;
      newStateArr.push(action.payload);
      newState.locations = newStateArr;
      return newState;
    }

    case LocationActionTypes.DELETE_LOCATION: {
      newState = Object.assign({}, state);
      const newStateArr = newState.locations.filter((location: Location) => location.id !== +action.payload);;
      newState.locations = newStateArr;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default locationReducer;
