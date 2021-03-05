import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Board from '../Board/Board';
import { getEmptyBoard, generateShips } from '../../logic';
import './Game.css';

function Game() {
  const [board1State, setBoard1State] = useState(getEmptyBoard);
  const [board2State, setBoard2State] = useState(getEmptyBoard);

  // ships auto placement
  useEffect(() => setBoard1State(generateShips()), []);
  useEffect(() => setBoard2State(generateShips()), []);

  const handleClick = () => setBoard1State(generateShips());

  return (
    <div className="Game">
      <div className="boards">
        <Board className="player1" boardState={board1State} />
        <Board className="player2" boardState={board2State} />
      </div>
      <Button
        className="genShipsButton"
        variant="contained"
        size="medium"
        endIcon={<AutorenewIcon />}
        onClick={handleClick}
      >
        autoplace ships
      </Button>
    </div>
  );
}

export default Game;
