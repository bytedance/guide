import React, { useState } from 'react';
import Guide from 'byte-guide';
import { Button, Grid, Card as CardComponent } from '../components';
import { ITEMS, STEPS } from './const';
import './index.css';

const { Card, CardTitle, CardMedia, CardText } = CardComponent;

const count = ITEMS.length;

const LeftColumn = (): JSX.Element => (
  <Grid container direction="column">
    <Grid item>
      <Card>
        <CardTitle id="gallery-title">NATURE</CardTitle>
        <CardText>
          Vivamus sollicitudin mauris quis ipsum pharetra, id iaculis diam
          vulputate.
        </CardText>
      </Card>
    </Grid>
    {ITEMS.slice(0, Math.ceil(count / 2)).map(({ title, media, text }) => (
      <Grid item key={title}>
        <Card>
          <CardTitle id={`${title}-title`}>{title}</CardTitle>
          <CardMedia id={`${title}-media`} src={media} />
          <CardText id={`${title}-text`}>{text}</CardText>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const RightColumn = (): JSX.Element => (
  <Grid container direction="column">
    {ITEMS.slice(Math.ceil(count / 2)).map(({ title, media, text }) => (
      <Grid item key={title}>
        <Card right>
          <CardTitle id={`${title}-title`}>{title}</CardTitle>
          <CardMedia id={`${title}-media`} src={media} />
          <CardText id={`${title}-text`}>{text}</CardText>
        </Card>
      </Grid>
    ))}
    <Grid item>
      <Card right id="gallery-footer">
        <CardTitle>SUBLIME AND PEACEFUL</CardTitle>
        <CardText>
          Vivamus sollicitudin mauris quis ipsum pharetra, id iaculis diam
          vulputate.
        </CardText>
      </Card>
    </Grid>
  </Grid>
);

const App = (): JSX.Element => {
  const [step, setStep] = useState(-1);
  const [guideVisible, setGuideVisible] = useState(false);
  const [maskedGuideVisible, setMaskedGuideVisible] = useState(false);

  const handleMaskedGuideOpen = (): void => {
    setMaskedGuideVisible(true);
    setGuideVisible(false);
    setStep(-1);
  };

  const handleGuideOpen = (): void => {
    setMaskedGuideVisible(false);
    setGuideVisible(true);
    setStep(-1);
  };

  const Guides = (): JSX.Element => (
    <>
      <Guide steps={STEPS} mask visible={maskedGuideVisible} lang="en" />
      <Guide
        steps={STEPS}
        mask={false}
        hotspot
        lang="en"
        visible={guideVisible}
      />
      <Guide
        steps={STEPS}
        mask={false}
        step={step}
        lang="en"
        modalClassName="guide-hidden-footer"
      />
    </>
  );

  const Buttons = (): JSX.Element => (
    <>
      <Button
        className="demo-main-btn demo-mask"
        onClick={handleMaskedGuideOpen}
      >
        masked mode
      </Button>
      <Button className="demo-main-btn demo-nomask" onClick={handleGuideOpen}>
        unmasked mode
      </Button>
      <Button
        className="demo-main-btn add-step"
        onClick={() => {
          setStep(step + 1);
          setMaskedGuideVisible(false);
          setGuideVisible(false);
        }}
      >
        controlled mode: click me to go to next step
      </Button>
    </>
  );

  return (
    <>
      <Guides />
      <h2 className="demo-main-header">Start the tour </h2>
      <Buttons />
      <Grid container className="demo-nomask-container">
        <Grid item>
          <LeftColumn />
        </Grid>
        <Grid item>
          <RightColumn />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
