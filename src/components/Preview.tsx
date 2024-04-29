import React from 'react';

import Button from './Button';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';

const Preview: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = (): void => {
    dispatch(openModal());
  };

  return (
    <div className="preview">
      <h2>Здесь пока ничего нет</h2>
      <Button onClick={handleClick} colorType="primary">Получить данные</Button>
    </div>
  );
};

export default Preview;
