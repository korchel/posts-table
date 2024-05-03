import React, { type ChangeEventHandler, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounceValue } from 'usehooks-ts';
import Highlighter from 'react-highlight-words';

import { getFilteredData, getFilter, getSortDierction, getSortKey, setFilter, setSortDirection, setSortKey } from '../store/dataSlice';
import type { SortKey } from '../types';
import { openModal } from '../store/modalSlice';

import { type AppDispatchType } from '../store';
import Button from './Button';

const Table: React.FC = () => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);

  const dispatch = useDispatch<AppDispatchType>();

  const currentSortKey = useSelector(getSortKey);
  const currentSortDirection = useSelector(getSortDierction);
  const filter = useSelector(getFilter);

  const data = useSelector(getFilteredData);
  const handleSort = (key: SortKey): void => {
    if (currentSortKey === key) {
      const sortDirection = currentSortDirection === 'down' ? 'up' : 'down';
      dispatch(setSortDirection(sortDirection));
      dispatch(setSortKey(key));
    } else {
      dispatch(setSortDirection('up'));
      dispatch(setSortKey(key));
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    setDebouncedValue(e.target.value);
  };

  const handleClick = (): void => {
    dispatch(openModal());
  };

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      dispatch(setFilter(debouncedValue));
    } else {
      dispatch(setFilter(''));
    }
  }, [debouncedValue]);

  return (
    <div className="tableContainer">
      <div className="tableContainer__header">
        <div className="inputField inputField_short">
          <input value={value} onChange={(e) => { handleChange(e); }} className="inputField__input" placeholder="Поиск" aria-label="Поиск" />
        </div>
        <Button onClick={handleClick} className="button_short" colorType="primary">Получить данные</Button>
      </div>
      <table className="table">
        <tr>
          <th className="table__cell table__cell_pointer" onClick={() => { handleSort('id'); }}>ID</th>
          <th className="table__cell table__cell_pointer" onClick={() => { handleSort('userId'); }}>ID пользователя</th>
          <th className="table__cell table__cell_pointer" onClick={() => { handleSort('title'); }}>Название</th>
          <th className="table__cell table__cell_pointer" onClick={() => { handleSort('body'); }}>Содержание</th>
        </tr>
        <tbody >
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td className="table__cell table__cell_center">{item.id}</td>
                <td className="table__cell table__cell_center">{item.userId}</td>
                <td className="table__cell">
                  <Highlighter
                    searchWords={[filter]}
                    autoEscape={true}
                    textToHighlight={item.title}
                  />
                </td>
                <td className="table__cell">
                  <Highlighter
                    searchWords={[filter]}
                    autoEscape={true}
                    textToHighlight={item.body}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
