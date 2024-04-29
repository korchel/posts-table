import React, { type ButtonHTMLAttributes, type DetailedHTMLProps, type ReactNode } from 'react';
import clsx from 'clsx';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  colorType?: 'ghost' | 'primary';
}

const Button: React.FC<IButtonProps> = ({ children, colorType = 'ghost', ...props }) => {
  return (
    <button {...props} className={clsx('button', { button_color_primary: colorType === 'primary' }, { button_color_ghost: colorType === 'ghost' })} >
      {children}
    </button>
  );
};

export default Button;
