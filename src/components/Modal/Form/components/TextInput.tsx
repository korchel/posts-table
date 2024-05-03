import React, { type LegacyRef } from 'react';
import clsx from 'clsx';
import InputMask, { type ReactInputMask } from 'react-input-mask';

import ErrorMessage from './ErrorMessage';

interface ITextInputProps {
  ref?: LegacyRef<ReactInputMask> | undefined,
  mask: string,
  icon?: null | 'vk' | 'ig' | 'fb' | 'ok' | 'globe' | 'yt';
  label?: string | null;
  required?: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
  className?: string,
  error?: string | undefined,
  touched?: boolean | undefined,
}

const TextInput: React.FC<ITextInputProps> = ({
  value,
  handleChange,
  name,
  mask,
  required = false,
  label = null,
  icon = null,
  className,
  error,
  touched,
  ...props
}) => {
  return (
    <div className={clsx('inputField', { inputField_flex: icon }, { inputField_error: error && touched }, className)}>
      <label
        className={clsx('label', { label_required: required })}
        htmlFor={name}
      >
        {label}
      </label>
      <InputMask
        mask={mask}
        alwaysShowMask
        value={value}
        onChange={handleChange}
        aria-label={name}
        className={clsx('inputField__input', { inputField__input_padding: !label })}
        {...props}
        id={name}
      />
      {icon && <img className="inputField__icon" src={`./icons/${icon}.svg`} alt={icon} />}
      {error && touched && <ErrorMessage error={error} />}
    </div>
  );
};

export default TextInput;
