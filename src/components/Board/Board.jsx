import React from 'react';
import Square from '../Square/Square';
import './Board.css';

function Board({ className, boardState }) {
  return (
    <div className={`Board ${className}`}>
      { boardState.map((status, i) => (
        <Square key={i} status={status} />)) }
    </div>
  );
}

export default Board;
