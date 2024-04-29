import React from 'react';

import { useSelector } from 'react-redux';
import Table from '../components/Table';
import { getShown } from '../store/modalSlice';
import Modal from '../components/Modal';
import Preview from './Preview';
import BackDrop from './BackDrop';
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