import { UserLogin, UserSignup } from '../session';

export enum ActionTypes {
  SET_USER = 'user/set',
  REMOVE_USER = 'user/remove'
}

interface SetUser {
  type: ActionTypes.SET_USER,
  payload: UserLogin | UserSignup
}

interface RemoveUser {
  type: ActionTypes.REMOVE_USER,
  payload: null 
}

export type Action = SetUser | RemoveUser;
