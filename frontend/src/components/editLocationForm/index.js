import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateLocation } from '../../store/locations';
import './index.css';

const EditLocationForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oldLocationSel = useSelector(state => state.location.locations) || [];
  const oldLocation = oldLocationSel.find(loc => +loc.id === +id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(Infinity);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // handle loading location in rc
    setTitle(oldLocation?.title || '');
    setDescription(oldLocation?.description || '');
    setPrice(oldLocation?.price || Infinity);
    setLocation(oldLocation?.location || '');
    setImage(oldLocation?.Images[0].imageUrl || '');
  }, [oldLocation]);


  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(updateLocation({
      id,
      title,
      description,
      price,
      location,
      Images: [{
        imageUrl: image
      }]
    }))
      .catch(async errs => {
        const errJson = await errs.json() || errs;
        if (errJson.errors) {
          setErrors(errJson.errors);
        }
      });
  };

  return (
    <div className='form-container'>
      <form
        onSubmit={handleSubmit}
        className='location-form'
      >
        {errors && (
          <ul>{errors.map(err => <li key={err}>{err}</li> )}</ul>
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

export default EditLocationForm;
