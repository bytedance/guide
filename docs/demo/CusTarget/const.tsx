import React from 'react';
import { IStep } from '../../../src/typings/guide';

export const STEPS: IStep[] = [
  {
    title: '1、Koala Picture',
    targetPos: {
      top: 200,
      left: 200,
      width: 50,
      height: 50
    },
    content: (
      <div style={{ color: 'red' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    ),
    placement: 'left',
  },
  {
    targetPos: {
      top: 400,
      left: 400,
      width: 50,
      height: 50
    },
    title: '2、Little Lamb',
    content:
      'Duis vehicula magna ac libero cursus, ac pulvinar enim finibus.  ',
    placement: 'right-top',
  },
  {
     targetPos: {
      top: 700,
      left: 400,
      width: 50,
      height: 50
    },
    title: '3、Seagull',
    content: 'Curabitur suscipit tincidunt mauris placerat semper. ',
    placement: 'left-bottom',
  },
  {
     targetPos: {
      top: 700,
      left: 600,
      width: 50,
      height: 50
    },
    title: '4、Intro',
    content: 'Fusce nec arcu justo.',
    placement: 'left',
  },
  {
     targetPos: {
      top: 800,
      left: 400,
      width: 50,
      height: 50
    },
    title: '5（end）、Footer ',
    content: 'Fusce nec arcu justo.',
    placement: 'right',
  },
];
