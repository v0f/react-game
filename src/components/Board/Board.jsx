import React from 'react';
import Square from '../Square/Square';
import './Board.css';

function Board({ className, boardState, onClick }) {
  return (
    <div className={`Board ${className}`}>
      { boardState.map((status, i) => (
        <Square
          key={i}
          status={status}
          onClick={onClick ? () => onClick(i) : null}
        />
      ))}
    </div>
  );
}

export default Board;
