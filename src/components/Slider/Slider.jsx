import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default function DiscreteSlider({ marks, onChange }) {
  const defaultValue = marks.find((m) => m.default).value;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e, newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      onChange(e, marks[newValue].realValue);
    }
  };
  return (
    <div className="slider" style={{ width: '200px', padding: '10px 30px' }}>
      <Typography gutterBottom>board size</Typography>
      <Slider
        value={value}
        step={null}
        valueLabelDisplay="off"
        min={marks[0].value}
        max={marks[marks.length - 1].value}
        marks={marks}
        track={false}
        onChange={handleChange}
      />
    </div>
  );
}
