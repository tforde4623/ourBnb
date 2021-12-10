import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getUserReviews, postUserReview } from '../../store/reviews';
import './index.css';

const ViewLocation = () => {
  const { locId } = useParams();
  const dispatch = useDispatch();
  const locations = useSelector(state => state.location.locations) || [];
  const reviews = useSelector(state => Object.values(state.review.reviews)) || [];
  const currLocation = locations.find(location => +location.id === +locId);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

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

  return (
    <div className='location-view-container'>
      <div className='location-view'>
        <div className='location-view-group1'>
          <img alt='location view' src={currLocation?.Images[0].imageUrl} />
          <div>{currLocation?.title}</div>
          <div>{currLocation?.price}$</div>
        </div>
        <div className='location-view-group2'>
          <div>{currLocation?.description}</div>
          <div>{currLocation?.location}</div>
        </div>
      </div>

      <div className='add-review-form'>
        <form onSubmit={handleSubmit}>
          <input 
            placeHolder='review title'
            value={reviewTitle}
            onChange={e => setReviewTitle(e.target.value)}
            className='form-input' />
          <textarea
            placeholder='how was it?'
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
            <li>
              <p>{review.title}</p>
              <p>{review.content}</p>
              <p>{review.User.username}</p>
            </li>
          ); 
        })}
      </ul>
    </div>
  );
}

export default ViewLocation;
