import React, { type DetailedHTMLProps, type LabelHTMLAttributes, type ReactNode } from 'react';

interface IInputLabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  children: ReactNode;

}

const InputLabel: React.FC<IInputLabelProps> = ({ children, ...props }) => {
  return (
    <label {...props}>{children}</label>
  );
};

export default InputLabel;
