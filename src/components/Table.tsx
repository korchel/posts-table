import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortDierction, getSortKey, getSortedData, setSortDirection, setSortKey } from '../store/dataSlice';
import type { SortKey } from '../types';

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const currentSortKey = useSelector(getSortKey);
  const currentSortDirection = useSelector(getSortDierction);

  const data = useSelector(getSortedData);
  const handleClick = (key: SortKey): void => {
    if (currentSortKey === key) {
      const sortDirection = currentSortDirection === 'down' ? 'up' : 'down';
      dispatch(setSortDirection(sortDirection));
      dispatch(setSortKey(key));
    } else {
      dispatch(setSortDirection('up'));
      dispatch(setSortKey(key));
    }
  };
  return (
    <>
      <input />
      <table className="table">
        <tr>
          <th className="table__cell table__cell_pointer" onClick={() => { handleClick('id'); }}>ID</th>
          <th className="table__cell table__cell_pointer" onClick={() => { handleClick('userId'); }}>ID пользователя</th>
          <th className="table__cell table__cell_pointer" onClick={() => { handleClick('title'); }}>Название</th>
          <th className="table__cell table__cell_pointer" onClick={() => { handleClick('body'); }}>Содержание</th>
        </tr>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td className="table__cell table__cell_center">{item.id}</td>
                <td className="table__cell table__cell_center">{item.userId}</td>
                <td className="table__cell">{item.title}</td>
                <td className="table__cell">{item.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
