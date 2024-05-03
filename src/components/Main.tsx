import React from 'react';

import { useSelector } from 'react-redux';
import Table from './Table';
import { getShown } from '../store/modalSlice';
import Modal from './Modal/Modal';
import Preview from './Preview';
import BackDrop from './Modal/BackDrop';
import { getDataWasFetched } from '../store/dataSlice';

const Main: React.FC = () => {
  const showModal = useSelector(getShown);
  const dataWasFetched = useSelector(getDataWasFetched);
  return (
    <div className="container">
      {dataWasFetched ? <Table /> : <Preview />}
      {showModal && <BackDrop />}
      {showModal && <Modal />}
    </div>
  );
};

export default Main;
