import React, { Children } from 'react';
import './Grid.css';

interface IGrid {
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, string | number>;
  container?: boolean;
  item?: boolean;
  direction?: 'row' | 'column';
  edge?: 'start' | 'end';
}

const Grid: React.FC<IGrid> = ({
  children,
  className,
  style,
  item = true,
  container = false,
  direction = 'row',
  edge = 'start',
}) => {
  const count = Children.toArray(children).length;

  return item ? (
    <div
      className={['grid-item', edge === 'end' ? 'end-item ' : '', className]
        .filter(s => s?.length)
        .join(' ')}
      style={style}
    >
      {children}
    </div>
  ) : container ? (
    <div
      className={['grid', className].filter(s => s?.length).join(' ')}
      style={{
        gridTemplateColumns:
          direction === 'row' ? `repeat(${count}, auto)` : 'initial',
        gridTemplateRows:
          direction === 'column' ? `repeat(${count}, auto)` : 'initial',
        ...style,
      }}
    >
      {children}
    </div>
  ) : null;
};

export default Grid;
