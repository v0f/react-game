import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

export default function SoundSlider({ value, onChange }) {
  const [curValue, setValue] = useState(value);
  const handleChange = (e, newValue) => {
    if (newValue !== curValue) {
      setValue(newValue);
      onChange(newValue);
    }
  };
  return (
    <div style={{ width: '150px' }}>
      <Slider
        value={curValue}
        step={0.1}
        valueLabelDisplay="off"
        min={0}
        max={1}
        marks
        track="normal"
        onChange={handleChange}
      />
    </div>
  );
}
