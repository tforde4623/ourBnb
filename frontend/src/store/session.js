import { csrfFetch } from './csrf';

// action type constants
const SET_USER = 'user/set';
const REMOVE_USER = 'user/remove';

// action objects
export const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// thunk for logging in user
export const loginUser = userObj => async dispatch => {
  const { credential, password } = userObj;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential: credential, password: password })
  });
  const resObj = await res.json();

  dispatch(setUser(resObj.user));
  // TODO: check on this return value
  return res;
};

// initial state should not contain a user
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_USER: {
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    }

    case REMOVE_USER: {
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
