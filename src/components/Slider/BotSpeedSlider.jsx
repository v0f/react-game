import React from 'react';
import Slider from './Slider';

const SLIDER_MARKS = [
  {
    value: 0,
    realValue: 2000,
    label: '0.5x',
  },
  {
    value: 1,
    realValue: 1000,
    label: '1x',
    default: true,
  },
  {
    value: 2,
    realValue: 500,
    label: '2x',
  },
];

export default function BotSpeedSlider({ onChange }) {
  return (
    <Slider label="bot speed" onChange={onChange} marks={SLIDER_MARKS} />
  );
}
