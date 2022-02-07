import { ActionTypes, Action } from './actionTypes/session';

// user obj types
export interface UserLogin {
  credential: string,
  password: string
}

export interface UserSignup {
  username: string,
  email: string,
  password: string
}


interface SessionState {
  user: UserSignup | UserLogin | null
}

const initialState = { user: null };

const sessionReducer = (state: SessionState = initialState, action: Action) => {
  let newState;
  switch(action.type) {
    case ActionTypes.SET_USER: {
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    }

    case ActionTypes.REMOVE_USER: {
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
