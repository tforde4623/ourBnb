import { csrfFetch } from './csrf';

const CREATE_REVIEW = 'reviews/create';
const LOAD_REVIEWS = 'reviews/load';
const REMOVE_REVIEW = 'reviews/remove';

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

export const destroyReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  };
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

export const removeReview = reviewId => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  const json = await res.json();
  dispatch(destroyReview(json.review.id))
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

    case REMOVE_REVIEW: {
      newState = Object.assign({}, state);
      const tmpRevs = newState.reviews.filter(rev => +rev.id !== +action.reviewId); 
      newState.reviews = tmpRevs;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reviewReducer;
