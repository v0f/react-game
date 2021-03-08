import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const marks = [
  {
    value: 0,
    label: '5 x 5',
  },
  {
    value: 1,
    label: '7 x 7',
  },
  {
    value: 2,
    label: '10 x 10',
  },
];

export default function DiscreteSlider({ onChange }) {
  return (
    <div className="slider" style={{ width: '200px', padding: '10px 30px' }}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        board size
      </Typography>
      <Slider
        defaultValue={3}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="off"
        min={0}
        max={2}
        marks={marks}
        track={false}
        onChange={onChange}
      />
    </div>
  );
}
