import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './index.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signupUser({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <h3>Sign Up!</h3>
      <ul>
        {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          )
        )}
      </ul>
        <input
          placeholder='Email'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder='Username'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder='Password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder='Confirm Password'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupFormPage;
