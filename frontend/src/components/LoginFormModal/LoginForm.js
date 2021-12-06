import { useState } from 'react';
import { useDispatch } from "react-redux";

import * as sessionActions from '../../store/session';

const LoginForm = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
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
  );
}

export default LoginForm;
