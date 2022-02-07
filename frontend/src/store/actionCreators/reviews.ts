import { Review } from '../reviews';
import { ActionTypes } from '../actionTypes/reviews';
import { csrfFetch } from '../csrf';
import { Dispatch } from 'redux';

export const postUserReview = (review: Review) => {
  return async (dispatch: Dispatch) => {
      const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
      });

      // TODO: some refactoring is in order here
      const json = await res.json();
      const reviews = await csrfFetch(`/api/locations/${json.locationId}/reviews`);
      const revJson = reviews.json();

      dispatch({
        type: ActionTypes.SET_REVIEWS,
        payload: revJson
      });
  };
}

export const getUserReviews = (locationId: number) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch(`/api/locations/${locationId}/reviews`);

    // check if ok
    const json = await res.json();

    dispatch({
      type: ActionTypes.SET_REVIEWS,
      payload: json
    });
  };
}

export const removeReview = (reviewId: number) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    })

    const json = await res.json();

    dispatch({
      type: ActionTypes.DELETE_REVIEW,
      payload: json.review.id
    });
  };
}

export const updateReview = (content: Review) => {
  return async (dispatch: Dispatch) => {
    const res = await csrfFetch(`/api/reviews/${content.id}`, {
      method: 'PUT',
      body: JSON.stringify(content)
    });

    if (res.ok) {
      const json = await res.json();

      dispatch({
        type: ActionTypes.EDIT_REVIEW,
        payload: json
      });

      return json;
    } else {
      // errors
      return res;
    }
  };
}
