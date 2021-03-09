import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  slider: {
    width: 150,
  },
});

export default function DiscreteSlider({ label, marks, onChange }) {
  const classes = useStyles();
  const defaultValue = marks.find((m) => m.default).value;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e, newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      onChange(e, marks[newValue].realValue);
    }
  };
  return (
    <div className={classes.slider}>
      <Typography>{label}</Typography>
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
