import React, { useState, useEffect } from 'react';
import Board from '../Board/Board';
import { getEmptyBoard, generateShips } from '../../logic';
import './Game.css';

function Game() {
  const [state, setState] = useState(getEmptyBoard);

  useEffect(() => setState(generateShips()), []);

  const handleClick = () => setState(generateShips());

  return (
    <div className="Game">
      <div className="boards">
        <Board className="player1" boardState={state} />
        {/* <Board className="player2" /> */}
      </div>
      <button type="button" onClick={handleClick}>generate</button>
    </div>
  );
}

export default Game;
