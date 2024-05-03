import React from 'react';
import clsx from 'clsx';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';
import { type FormikErrors, type FormikValues } from 'formik';

interface ISelectInputProps {
  label?: string | null;
  required?: boolean;
  name: string;
  setFieldValue: (field: string, value: string) => Promise<void> | Promise<FormikErrors<FormikValues>>;
  value: string;
  className?: string,
}

interface ISelectOption {
  label: string,
  value: string,
}
type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

const selectOptions: ISelectOption[] = [
  { value: 'Экология', label: 'Экология' },
  { value: 'Саентология', label: 'Саентология' },
  { value: 'Конспирология', label: 'Конспирология' },
];

const selectStyles: StylesConfig = {
  container: (baseStyles) => ({
    ...baseStyles,
    position: 'relative',
    top: '-8px',
    height: '26px',
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    border: 'none',
    alignContent: 'center',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
      height: '26px',
    },
    background: 'none'
  }),
  option: (baseStyles, { isSelected, isFocused }) => ({
    ...baseStyles,
    cursor: 'pointer',
    backgroundColor: isSelected ? '#E5266E' : isFocused ? '#f3a8c5' : 'white',
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    display: 'none',
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    height: '26px',
    padding: '0'
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontSize: '0.9em'
  }),
};

const SelectInput: React.FC<ISelectInputProps> = ({
  value,
  setFieldValue,
  name,
  required = false,
  label = null,
  className,
}) => {
  const handleSelect: onSelect = (option) => {
    const _option = option as ISelectOption;
    setFieldValue(name, _option.value);
  };

  return (
    <div className={clsx('inputField', className)}>
      <label
        className={clsx('label', { label_required: required })}
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        id={name}
        name={name}
        styles={selectStyles}
        className="select"
        classNamePrefix="react-select"
        options={selectOptions}
        placeholder='Выберите опцию'
        isClearable={true}
        isSearchable={false}
        value={value ? { value, label: value } : ''}
        onChange={handleSelect}
      />
    </div>
  );
};

export default SelectInput;
