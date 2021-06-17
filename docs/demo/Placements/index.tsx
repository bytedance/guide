import React, { useState } from 'react';
import Guide from 'byte-guide';
import Button from '../components/Button';
import { STEPS } from '../steps';
import './index.less';

const App = (): JSX.Element => {
  const [visible, setVisible] = useState({});

  const handleClick = (placement): void => {
    const key = Object.keys(visible).find((key) => visible[key]);
    const copy = { ...visible };
    if (key) {
      copy[key] = false;
    }
    copy[placement] = true;
    setVisible(copy);
  };

  const renderButton = (placement): JSX.Element => (
    <Button
      id={placement}
      key={placement}
      onClick={() => {
        handleClick(placement);
      }}
    >
      {placement}
    </Button>
  );

  return (
    <>
      <div className="topRow">
        {['top-left', 'top', 'top-right'].map(renderButton)}
      </div>
      <div className="leftCol">
        {['left-top', 'left', 'left-bottom'].map(renderButton)}
      </div>
      <div className="rightCol">
        {['right-top', 'right', 'right-bottom'].map(renderButton)}
      </div>
      <div className="bottomRow">
        {['bottom-left', 'bottom', 'bottom-right'].map(renderButton)}
      </div>
      {STEPS.map((step) => {
        const { placement } = step;
        return visible[placement] ? (
          <Guide
            key={step.placement}
            steps={[step]}
            lang="en"
            showStepInfo
            mask={false}
          />
        ) : null;
      })}
    </>
  );
};

export default App;
