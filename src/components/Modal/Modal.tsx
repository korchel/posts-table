import React, { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import clsx from 'clsx';

import Form from './Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getShown } from '../../store/modalSlice';

const Modal: React.FC = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const showModal = useSelector(getShown);

  const handleClickOutside = (): void => {
    dispatch(closeModal());
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <div className={clsx('backDrop', { backDrop_shown: showModal })}></div>
      <div className={clsx('modal', { modal_shown: showModal })} ref={ref}>
        <h2>Стать партнёром проекта</h2>
        <Form />
      </div>
    </>
  );
};

export default Modal;
