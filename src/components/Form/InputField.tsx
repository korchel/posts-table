import React, { type ReactNode, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface IInputFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  icon?: null | 'vk' | 'ig' | 'fb' | 'ok' | 'globe' | 'yt';
  label?: string | null;
  required?: boolean;
  select?: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
}

const InputField: React.FC<IInputFieldProps> = ({
  value,
  handleChange,
  name,
  required = false,
  label = null,
  icon = null,
  select = false,
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('inputField', { inputField_flex: icon }, className)}>
      <label
        className={clsx('inputField__label', { inputField__label_required: required })}
        htmlFor={name}
      >
        {label}
      </label>
      {!select && <input value={value} onChange={handleChange} aria-label={name} className={clsx('inputField__input', { inputField__input_padding: !label })} {...props} id={name} />}
      {icon && <img className="inputField__icon" src={`./icons/${icon}.svg`} alt={icon} />}
      {select && (
        <select name={name} value={value} onChange={handleChange} className='inputField__input'>
          <option value="Экология">Экология</option>
          <option value="Саентология">Саентология</option>
          <option value="Конспирология">Конспирология</option>
        </select>
      )}
    </div>
  );
};

export default InputField;
