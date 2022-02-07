import { Location } from '../locations'
import { ActionTypes } from '../actionTypes/locations';
import { csrfFetch } from '../csrf';
import { Dispatch } from 'redux';

export const getLocations = () => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch('/api/locations');
    const locations = await res.json();

    dispatch({
      type: ActionTypes.SET_LOCATIONS,
      payload: locations
    });

    return locations;
  };
} 

export const getUserLocations = (userId: number) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/locations`);
    const locations = await res.json();

    dispatch({
      type: ActionTypes.SET_LOCATIONS,
      payload: locations
    });

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
      dispatch({
        type: ActionTypes.EDIT_LOCATION,
        payload: data
      });

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
      dispatch({
        type: ActionTypes.DELETE_LOCATION,
        payload: id
      });

      return;
    }
  };
}
