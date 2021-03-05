import React from 'react';
import { squareType } from '../../constants';
import './Square.css';

function Square({ status, onClick }) {
  const className = squareType[status];
  return (
    <div className={`Square ${className}`} onClick={onClick} />
  );
}

export default Square;
