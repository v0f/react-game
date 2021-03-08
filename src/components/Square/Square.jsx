import React from 'react';
import { squareType } from '../../gameLogic/constants';
import './Square.css';

function Square({ status, onClick }) {
  const className = squareType[status];
  const symbol = {
    shot: 'X',
    miss: '·',
  }[squareType[status]] || '';
  return (
    <div className={`Square ${className}`} onClick={onClick}>
      {symbol}
    </div>
  );
}

export default Square;
