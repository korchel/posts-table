import React from 'react';

import { useSelector } from 'react-redux';
import Table from './Table';

import Modal from './Modal/Modal';
import Preview from './Preview';

import { getDataWasFetched } from '../store/dataSlice';

const Main: React.FC = () => {
  const dataWasFetched = useSelector(getDataWasFetched);
  return (
    <div className="container">
      {dataWasFetched ? <Table /> : <Preview />}

      <Modal />
    </div>
  );
};

export default Main;
