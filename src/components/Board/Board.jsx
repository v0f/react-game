import React from 'react';
import Square from '../Square/Square';
import './Board.css';

function Board({
  className, boardState, onClick, boardSize, player,
}) {
  return (
    <div className={`Board ${className}`} style={{ '--size': boardSize }}>
      { boardState.map((status, i) => (
        <Square
          key={i}
          status={status}
          onClick={onClick ? () => onClick(i) : null}
          player={player}
        />
      ))}
    </div>
  );
}

export default Board;
