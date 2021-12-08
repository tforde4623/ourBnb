import { csrfFetch } from './csrf';

// action constants
const SET_LOCATIONS = 'locations/get';

// action objects
export const setLocations = locations => {
  return {
    type: SET_LOCATIONS,
    locations
  }
};

// thunk for getting bulk (random) locations
export const getLocations = () => async dispatch => {
  const res = await csrfFetch('/api/locations');
  const locations = await res.json();
  dispatch(setLocations(locations));
  return locations;
};

const initialState = { locations: null };

const locationReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_LOCATIONS: {
      newState = Object.assign({}, state);
      newState.locations = action.locations;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default locationReducer;
