import { Review } from '../reviews';

export enum ActionTypes {
  SET_REVIEWS = 'reviews/get',
  EDIT_REVIEW = 'review/edit',
  DELETE_REVIEW = 'review/delete',
}

interface SetReview {
  type: ActionTypes.SET_REVIEWS,
  payload: Review[]
}

interface EditReview {
  type: ActionTypes.EDIT_REVIEW,
  payload: Review
}

interface RemoveReview {
  type: ActionTypes.DELETE_REVIEW,
  payload: number
}

export type Action = SetReview | EditReview | RemoveReview;
