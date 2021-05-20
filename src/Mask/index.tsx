import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { getDocument, getMaskStyle } from '../utils';
import './index.less';

interface IMask {
  className: string;
  anchorEl: Element;
  realWindow: Window;
}

const Mask: React.FC<IMask> = ({
  className,
  anchorEl,
  realWindow,
}): JSX.Element => {
  const [style, setStyle] = useState<Record<string, number>>({});
  const timerRef = useRef<number>(0);

  const calculateStyle = (): void => {
    const style = getMaskStyle(anchorEl);
    setStyle(style);
  };

  const handleResize = (): void => {
    if (timerRef.current) realWindow.cancelAnimationFrame(timerRef.current);
    timerRef.current = realWindow.requestAnimationFrame(() => {
      calculateStyle();
    });
  };

  useEffect(() => {
    calculateStyle();
  }, [anchorEl]);

  useEffect((): void | (() => void) => {
    realWindow.addEventListener('resize', handleResize);

    return () => {
      realWindow.removeEventListener('resize', handleResize);
    };
  }, [realWindow, anchorEl]);

  return ReactDOM.createPortal(
    <div className={`guide-mask ${className}`} style={style} />,
    getDocument(anchorEl).body,
  );
};

export default Mask;
