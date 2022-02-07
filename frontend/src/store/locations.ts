import { Action, ActionTypes } from './actionTypes/locations'

interface Image {
  imageUrl: string
}

export interface Location {
  id: number,
  title: string,
  description: string,
  location: string,
  price: number,
  Images: Image[]
}

interface LocationState {
  locations: Location[]
}

const initialState = { locations: [] };

const locationReducer = (state: LocationState = initialState, action: Action) => {
  let newState: LocationState;
  switch(action.type) {
    case ActionTypes.SET_LOCATIONS: {
      newState = Object.assign({}, state);
      newState.locations = action.payload
      return newState;
  }

    case ActionTypes.EDIT_LOCATION: {
      newState = Object.assign({}, state);
      const newStateArr = newState.locations.filter(location => +location.id !== +action.payload.id);;
      newStateArr.push(action.payload);
      newState.locations = newStateArr;
      return newState;
    }

    case ActionTypes.DELETE_LOCATION: {
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
