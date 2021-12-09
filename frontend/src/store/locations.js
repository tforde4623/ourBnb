import { csrfFetch } from './csrf';

// action constants
const SET_LOCATIONS = 'locations/get';
const EDIT_LOCATION = 'locations/edit';
const DELETE_LOCATION = 'locations/delete';

// action objects
export const setLocations = locations => {
  return {
    type: SET_LOCATIONS,
    locations
  }
};

export const editLocation = data => {
  return {
    type: EDIT_LOCATION,
    data
  }
};


export const removeLocation = id => {
  return {
    type: DELETE_LOCATION,
    id
  }
};

// thunk for getting bulk (random) locations
export const getLocations = () => async dispatch => {
  const res = await csrfFetch('/api/locations');
  const locations = await res.json();
  dispatch(setLocations(locations));
  return locations;
};

export const getUserLocations = userId => async dispatch => {
  const res = await csrfFetch(`/api/users/${userId}/locations`);
  const locations = await res.json();
  dispatch(setLocations(locations));
  return locations;
};

export const updateLocation = data => async dispatch => {
  const { id, title, description, location, price } = data;
  const res = await csrfFetch(`/api/locations/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      location,
      price: parseInt(price),
      image: data.Images[0].imageUrl
    })
  });

  if (res.ok) {
    dispatch(editLocation(data))
    return data;
  }
};

export const deleteLocation = id => async dispatch => {
  console.log('delete')
  const res = await csrfFetch(`/api/locations/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeLocation(id));
    return;
  }
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

    case EDIT_LOCATION: {
      newState = Object.assign({}, state);
      const newStateArr = newState.locations.filter(location => +location.id !== +action.data.id);;
      newStateArr.push(action.data);
      newState.locations = newStateArr;
      return newState;
    }

    case DELETE_LOCATION: {
      newState = Object.assign({}, state);
      const newStateArr = newState.locations.filter(location => +location.id !== +action.id);;
      newState.locations = newStateArr;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default locationReducer;
