import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getDocument, getMaskStyle } from '../utils';
import './index.less';

interface IMask {
  className: string;
  anchorEl: Element;
}

const Mask: React.FC<IMask> = ({ className, anchorEl }): JSX.Element => {
  const [style, setStyle] = useState<Record<string, number>>({});

  useEffect(() => {
    const style = getMaskStyle(anchorEl);
    setStyle(style);
  }, [anchorEl]);

  return ReactDOM.createPortal(
    <div className={`guide-mask ${className}`} style={style} />,
    getDocument(anchorEl).body,
  );
};

export default Mask;
