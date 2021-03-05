import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
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
      <Button
        className="genShipsButton"
        variant="contained"
        size="medium"
        endIcon={<AutorenewIcon />}
        onClick={handleClick}
      >
        расставить корабли
      </Button>
    </div>
  );
}

export default Game;
