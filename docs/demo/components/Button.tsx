import React from 'react';
import './Button.css';

interface IButton {
  id?: string;
  className?: string;
  children?: React.ReactNode | string | number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<IButton> = ({ className, children, ...otherProps }) => {
  return (
    <button
      className={['btn', className].filter((s) => !!s).join(' ')}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
