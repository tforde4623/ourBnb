import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            name='credential' 
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input 
            name='password' 
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <input type='submit'/>
      </form>
    </div>  
  );
}

export default LoginFormPage;
