import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './index.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='login' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
