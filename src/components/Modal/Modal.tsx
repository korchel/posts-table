import React, { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import Form from './Form/Form';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalSlice';

const Modal: React.FC = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleClickOutside = (): void => {
    dispatch(closeModal());
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className='modal' ref={ref}>
      <h2>Стать партнёром проекта</h2>
      <Form />
    </div>
  );
};

export default Modal;
