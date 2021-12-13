import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { removeReview, getUserReviews, postUserReview, updateReview } from '../../store/reviews';
import './index.css';

const ViewLocation = () => {
  const { locId } = useParams();
  const dispatch = useDispatch();
  const locations = useSelector(state => state.location.locations) || [];
  const reviews = useSelector(state => Object.values(state.review.reviews)) || [];
  const sessionUser = useSelector(state => state.session.user);
  const currLocation = locations.find(location => +location.id === +locId);
  const history = useHistory();
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewEditForm, setReviewEditForm] = useState(null);
  // state for review form
  const [editReviewTitle, setEditReviewTitle] = useState('');
  const [editReviewContent, setEditReviewContent] = useState('');
  const [reviewErrors, setReviewErrors] = useState([]);

  useEffect(() => {
    dispatch(getUserReviews(locId));
  }, [locId, dispatch])

  const clearReviewState = () => {
    setReviewTitle('');
    setReviewContent('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    const payload = {
      title: reviewTitle,
      content: reviewContent,
      locationId: locId
    }

    dispatch(postUserReview(payload));
    clearReviewState();
  }

  const handleDelete = val => {
    dispatch(removeReview(val))
  };

  const handleReviewEdit = review => {
    setReviewErrors([]);
    setReviewEditForm(review.id);
    setEditReviewTitle(review.title);
    setEditReviewContent(review.content);
  };

  const handleReviewEditSubmit = async e => {
    e.preventDefault();
    await dispatch(updateReview({
      id: reviewEditForm,
      title: editReviewTitle,
      content: editReviewContent
    }))
      .then(() => setReviewEditForm(null))
      .catch(async res => {
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
            onClick={currLocation?.ownerId === sessionUser.id ? () => history.push(`/edit-location/${currLocation.id}`) : null}
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
            placeHolder='Review Title...'
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
                      <ul>
                        {reviewErrors.map(err => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                    <input 
                      placeHolder='Review Title...'
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
