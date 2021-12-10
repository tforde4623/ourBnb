import { csrfFetch } from './csrf';

const CREATE_REVIEW = 'reviews/create';
const LOAD_REVIEWS = 'reviews/load';

export const addReview = review => {
  return {
    type: CREATE_REVIEW,
    review
  }
};

export const loadReviews = reviews => {
  return {
    type: LOAD_REVIEWS,
    reviews
  }
};

export const postUserReview = review => async dispatch => {
    const res = await csrfFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review)
    });

    const json = await res.json();
    dispatch(getUserReviews(json.locationId));
};

export const getUserReviews = locationId => async dispatch => {
  const res = await csrfFetch(`/api/locations/${locationId}/reviews`);

  // check if ok
  const json = await res.json();
  dispatch(loadReviews(json));
}; 


const initialState = { reviews: {} };

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_REVIEWS: {
      newState = Object.assign({}, state);
      newState.reviews = action.reviews;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reviewReducer;
