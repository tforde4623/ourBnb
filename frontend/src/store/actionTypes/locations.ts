import { Location } from '../locations';

export enum ActionTypes {
  SET_LOCATIONS = 'locations/get',
  EDIT_LOCATION = 'locations/edit',
  DELETE_LOCATION = 'locations/delete'
}

interface SetLocations {
  type: ActionTypes.SET_LOCATIONS,
  payload: Location[]
}

interface EditLocation {
  type: ActionTypes.EDIT_LOCATION,
  payload: Location
}

interface RemoveLocation {
  type: ActionTypes.DELETE_LOCATION,
  payload: number
}

export type Action = SetLocations | EditLocation | RemoveLocation;
