import React from 'react';
import './Tag.css';

interface ITag {
  id?: string;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}

const Tag: React.FC<ITag> = ({ className, color, children, ...otherProps }) => {
  return (
    <div
      className={['tag', className].filter((s) => !!s).join(' ')}
      style={{ color, borderColor: color }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Tag;
