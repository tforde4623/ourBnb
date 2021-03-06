import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { csrfFetch } from '../../store/csrf';
import './index.css';

const AddLocationForm = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

  // require user to be logged in
  if(!sessionUser) return <Redirect to='/signup' />

  const handleSubmit = async e => {
    e.preventDefault();

    await csrfFetch('/api/locations', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        location,
        price: parseInt(price),
        image
      })
    })
      .then(() => window.location.href = '/')
      .catch(async res => {
        const json = await res.json();

        if (json && json.errors) {
          setErrors(json.errors);
        }
      })
  };

  return (
    <div className='form-container'>
      <form
        onSubmit={handleSubmit}
        className='location-form'
      >
      <h2>Post Your Location!</h2>
        {errors && (
          <ul>
            {errors.map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <input
          placeholder='Spot Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='form-input'
        />
        <input
          placeholder='Where is it?'
          value={location}
          onChange={e => setLocation(e.target.value)}
          className='form-input'
        />
        <textarea
          placeholder='Spot description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='form-input'
        ></textarea>
        <input
          placeholder='Cost per night?'
          value={price}
          onChange={e => setPrice(e.target.value)}
          className='form-input'
        />
        <input
          placeholder='Preview image url?'
          value={image}
          onChange={e => setImage(e.target.value)}
          className='form-input'
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddLocationForm;
