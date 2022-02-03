import React, { useState } from 'react';
import Guide from 'byte-guide';
import { Button, Grid } from '../components';
import { STEPS } from './const';
import './index.css';

const App = (): JSX.Element => {
  const [step, setStep] = useState(-1);

  return (
    <>
      <Guide
        steps={STEPS}
        mask={false}
        step={step}
        modalClassName="guide-hidden-footer"
        closeEle='jump'
      />
      <h2 className="demo-main-header">Start the tour </h2>
      <Button
        className="demo-main-btn demo-mask"
        onClick={() => setStep(step + 1)}
      >
        自定义target（受控）
      </Button>
      <Grid container className="demo-nomask-container">
        <canvas
          id="myCanvas"
          width="600"
          height="800"
          style={{ border: '1px solid #c3c3c3' }}
        >
          Your browser does not support the canvas element.
        </canvas>
      </Grid>
    </>
  );
};

export default App;
