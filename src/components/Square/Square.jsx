import React from 'react';
import { squareType } from '../../constants';
import './Square.css';

function Square({ status }) {
  const className = squareType[status];
  return (
    <div className={`Square ${className}`} />
  );
}

export default Square;
