import { Dispatch } from 'redux';
import { UserLogin, UserSignup } from '../session';
import { ActionTypes } from '../actionTypes/session';
import { csrfFetch } from '../csrf';

// thunk for logging in user
export const loginUser = (userObj: UserLogin) => {
  return async (dispatch: Dispatch) => {
    const { credential, password } = userObj;
    const res = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({ credential: credential, password: password })
    });

    const resObj = await res.json();

    dispatch({
      type: ActionTypes.SET_USER,
      payload: resObj.user
    });

    return res;
  };
}

// thunk for restoring session (persisting user on refresh)
export const restoreUser = () => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch('/api/session');
    const resObj = await res.json();

    dispatch({
      type: ActionTypes.SET_USER,
      payload: resObj.user
    });

    return res;
  };
}

// thunk for signing up the user
export const signupUser = (userDetails: UserSignup) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password
      }),
    });

    const resObj = await res.json();

    dispatch({
      type: ActionTypes.SET_USER,
      payload: resObj.user
    });

    return res;
  };
}

// thunk for logging out the user
export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch('/api/session', {
      method: 'DELETE'
    });

    dispatch({
      type: ActionTypes.REMOVE_USER,
      payload: null
    });

    return res;
  };
}
