import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypeSelector'
import { removeReview, getUserReviews, postUserReview, updateReview } from '../../store/actionCreators/reviews';
import './index.css';

// TODO: move this to review redux
interface Review {
  id: number,
  title: string,
  content: string
}

const ViewLocation = () => {
  const { locId }: { locId: string } = useParams();
  const dispatch: any = useDispatch();
  const locations = useTypedSelector(state => state.location.locations) || [];
  const reviews = useTypedSelector(state => Object.values(state.review.reviews)) || [];
  const sessionUser = useTypedSelector(state => state.session.user);
  const currLocation = locations.find(location => +location.id === +locId);
  const history = useHistory();
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewEditForm, setReviewEditForm] = useState<number | null>(null);
  // state for review form
  const [editReviewTitle, setEditReviewTitle] = useState('');
  const [editReviewContent, setEditReviewContent] = useState('');
  const [reviewErrors, setReviewErrors] = useState([]);

  useEffect(() => {
    dispatch(getUserReviews(parseInt(locId)));
  }, [locId, dispatch])

  const clearReviewState = () => {
    setReviewTitle('');
    setReviewContent('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const payload = {
      title: reviewTitle,
      content: reviewContent,
      locationId: parseInt(locId)
    }

    dispatch(postUserReview(payload));
    clearReviewState();
  }

  const handleDelete = (val: number) => {
    dispatch(removeReview(val))
  };

  const handleReviewEdit = (review: Review) => {
    setReviewErrors([]);
    setReviewEditForm(review.id);
    setEditReviewTitle(review.title);
    setEditReviewContent(review.content);
  };

  const handleReviewEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(updateReview({
      id: reviewEditForm,
      title: editReviewTitle,
      content: editReviewContent
    }))
      .then(() => setReviewEditForm(null))
      .catch(async (res: Response) => {
      const json = await res.json();
      setReviewErrors(json?.errors);
    })
  }
  
  return (
    <div className='location-view-container'>
      <div className='location-view'>
        <div className='location-view-group1'>
          <img 
            className='location-details-img'
            alt='location view' 
            src={currLocation?.Images[0].imageUrl} 
            onClick={
              () => {
                if (currLocation && sessionUser) {
                  if (currLocation?.ownerId === sessionUser.id) {
                    history.push(`/edit-location/${currLocation.id}`)
                  }
                }
              }
            }
          />
          <div className='location-details-head'>
            <div>{currLocation?.title}</div>
            <div>{currLocation?.price}$ / night</div>
          </div>
        </div>
        <div className='location-view-group2'>
          <div>{currLocation?.description}</div>
          <div>{currLocation?.location}</div>
        </div>
      </div>

      <div className='add-review-form'>
        <h3>Add a Review</h3>
        <form onSubmit={handleSubmit}>
          <input 
            value={reviewTitle}
            onChange={e => setReviewTitle(e.target.value)}
            className='form-input' />
          <textarea
            placeholder='How was it?...'
            value={reviewContent}
            onChange={e => setReviewContent(e.target.value)}
            className='form-input'
          ></textarea>
          <button>Add Review</button>
        </form>
      </div>

      <ul className='review-container'>
        {reviews.map(review => {
          return (
            <li className='review-li' key={review.id}>
              <h3>
                <p className='review-user'>{review.User.username}</p>
                <p className='review-date'>
                  {new Date(review.updatedAt).toLocaleDateString()}
                </p>
              </h3>
                {reviewEditForm === review.id ? (
                  <form className='review-edit-form'>
                    {reviewErrors && (
                      <ul className='review-errors'>
                        {reviewErrors.map(err => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                    <input 
                      value={editReviewTitle}
                      onChange={e => setEditReviewTitle(e.target.value)}
                      className='form-input' />
                    <textarea
                      placeholder='How was it?...'
                      value={editReviewContent}
                      onChange={e => setEditReviewContent(e.target.value)}
                      className='form-input'
                    ></textarea>
                    <button onClick={handleReviewEditSubmit}>Save</button>
                  </form>
                ) : (
                  <div className='review-li'>
                    <p>{review.title}</p>
                    <p>{review.content}</p>
                  {sessionUser.username === review?.User.username 
                    ? <p>
                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                        <button onClick={() => handleReviewEdit(review)}>Edit Review</button>
                      </p> 
                    : null}
                  </div>
                )}
            </li>
          ); 
        })}
      </ul>
    </div>
  );
}

export default ViewLocation;
