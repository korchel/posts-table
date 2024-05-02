import React from 'react';
import clsx from 'clsx';

interface ISelectInputProps {
  label?: string | null;
  required?: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
  className?: string,
}

const SelectInput: React.FC<ISelectInputProps> = ({
  value,
  handleChange,
  name,
  required = false,
  label = null,
  className,
}) => {
  return (
    <div className={clsx('inputField', className)}>
      <label
        className={clsx('label', { label_required: required })}
        htmlFor={name}
      >
        {label}
      </label>
      <select name={name} value={value} onChange={handleChange} className='inputField__select inputField__input inputField__select_padding'>
        <option value="Экология">Экология</option>
        <option value="Саентология">Саентология</option>
        <option value="Конспирология">Конспирология</option>
      </select>
    </div>
  );
};

export default SelectInput;
