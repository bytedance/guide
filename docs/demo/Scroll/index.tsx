import React from 'react';
import Guide from 'guide';
import Button from '../components/Button';
import { STEPS, placements } from '../steps';
import './index.css';

const App = (): JSX.Element => {
  return (
    <div className="container">
      <Guide steps={STEPS.reverse()} mask={false} lang="en" />
      <div className="btn-container">
        {placements.map(({ title, placement }) => (
          <Button id={placement} key={placement}>
            {title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default App;
