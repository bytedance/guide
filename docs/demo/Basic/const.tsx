import React from 'react';
import { IStep } from '../../../src/typings/guide';
import img1 from './img/1.jpeg';
import img2 from './img/2.jpeg';
import img3 from './img/3.jpeg';
import img4 from './img/4.jpeg';

export const ITEMS = [
  {
    title: 'Bunny',
    media: img1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  },
  {
    title: 'Koala',
    media: img2,
    text: 'Etiam sit amet tortor aliquet, sodales tellus eu, porttitor purus.',
  },
  {
    title: 'Lamb',
    media: img3,
    text: 'Donec euismod arcu et lacinia consequat. ',
  },
  {
    title: 'Seagull',
    media: img4,
    text: 'Sed et ex quam. ',
  },
];

export const STEPS: IStep[] = [
  {
    selector: '#Koala-media',
    title: 'Koala Picture',
    content: (
      <div style={{ color: 'red' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    ),
    placement: 'left',
  },
  {
    selector: '#Lamb-title',
    title: 'Little Lamb',
    content:
      'Duis vehicula magna ac libero cursus, ac pulvinar enim finibus.  ',
    placement: 'right-top',
  },
  {
    selector: '#Seagull-text',
    title: 'Seagull',
    content: 'Curabitur suscipit tincidunt mauris placerat semper. ',
    placement: 'left-bottom',
  },
  {
    selector: '#gallery-title',
    title: 'Intro',
    content: 'Fusce nec arcu justo.',
    placement: 'left',
  },
  {
    selector: '#gallery-footer',
    title: 'Footer',
    content: 'Fusce nec arcu justo.',
    placement: 'right',
  },
];
