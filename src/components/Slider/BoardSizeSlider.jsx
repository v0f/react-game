import React from 'react';
import Slider from './Slider';

const SLIDER_MARKS = [
  {
    value: 0,
    realValue: 5,
    label: '5 x 5',
  },
  {
    value: 1,
    realValue: 7,
    label: '7 x 7',
  },
  {
    value: 2,
    realValue: 10,
    label: '10 x 10',
    default: true,
  },
];

export default function BoardSizeSlider({ onChange }) {
  return (
    <Slider label="board size" onChange={onChange} marks={SLIDER_MARKS} />
  );
}
