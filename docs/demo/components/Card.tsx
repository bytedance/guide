import React from 'react';
import './Card.css';

interface ICard {
  id?: string;
  children?: React.ReactNode | string | number;
  right?: boolean;
}

interface ICardTitle {
  id?: string;
  children?: React.ReactNode | string | number;
}

interface ICardMedia {
  id?: string;
  src: string;
}

interface ICardText {
  id?: string;
  children?: React.ReactNode | string | number;
}

export const Card: React.FC<ICard> = ({ children, right, ...otherProps }) => (
  <div
    className={['card', right ? 'card-right' : 'card-left'].join(' ')}
    {...otherProps}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<ICardTitle> = ({
  children,
  ...otherProps
}) => (
  <h3 className="card-title" {...otherProps}>
    {children}
  </h3>
);

export const CardMedia: React.FC<ICardMedia> = ({ src, ...otherProps }) => (
  <div className="card-media" {...otherProps}>
    <img src={src} />
  </div>
);

export const CardText: React.FC<ICardText> = ({ children, ...otherProps }) => (
  <p className="card-text" {...otherProps}>
    {children}
  </p>
);

export default { Card, CardTitle, CardMedia, CardText };
