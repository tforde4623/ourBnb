import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const LoginForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  let errorUlContent;
  if (errors.length) {
    errorUlContent =
      <ul class="error-ul">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {errorUlContent}

        <div className='input-container'>
          <input 
            name='credential' 
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
            placeHolder='Enter Username'
          />
          <i class='fa fa-user fa-lg' />
        </div>

        <div className='input-container password-input-container'>
          <input 
            name='password' 
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeHolder='Enter Password'
          />
          <i class='fa fa-lock fa-lg' />
        </div>
        <button>Login</button>
      </form>
      <hr/>
      Don't have an account? <Link onClick={closeModalHandler} to="/signup">Sign Up</Link>
    </>
  );
}

export default LoginForm;
