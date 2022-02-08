import { Action, ActionTypes } from './actionTypes/reviews';

export interface NewReview {
  title: string,
  content: string,
  userId?: number,
  locationId: number
}

export interface Review extends NewReview {
  id: number,
}

interface ReviewState {
  reviews: Review[]
}

const initialState = { reviews: [] };

const reviewReducer = (state: ReviewState = initialState, action: Action) => {
  let newState;
  switch(action.type) {
    case ActionTypes.SET_REVIEWS: {
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    }

    case ActionTypes.DELETE_REVIEW: {
      newState = Object.assign({}, state);
      const tmpRevs = newState.reviews.filter((rev: Review) => +rev.id !== +action.payload); 
      newState.reviews = tmpRevs;
      return newState;
    }

    case ActionTypes.EDIT_REVIEW: {
      newState = Object.assign({}, state);
      const oldRevs = newState.reviews.filter((rev: Review) => +rev.id !== +action.payload.id);
      oldRevs.push(action.payload);
      newState.reviews = oldRevs;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reviewReducer;
