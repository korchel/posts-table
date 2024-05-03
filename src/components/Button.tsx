import React, { type ButtonHTMLAttributes, type DetailedHTMLProps, type ReactNode } from 'react';
import clsx from 'clsx';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  colorType?: 'ghost' | 'primary';
  className?: string;
}

const Button: React.FC<IButtonProps> = ({ children, colorType = 'ghost', className, ...props }) => {
  return (
    <button
      {...props}
      className={
        clsx(
          'button',
          { button_color_primary: colorType === 'primary' },
          { button_color_ghost: colorType === 'ghost' },
          className
        )
      }
    >
      {children}
    </button>
  );
};

export default Button;
