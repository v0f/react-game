import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Board from '../Board/Board';
import { getEmptyBoard, generateShips } from '../../logic';
import { squareType } from '../../constants';
import { makeSound } from '../../sounds';
import './Game.css';

function Game() {
  const [board1State, setBoard1State] = useState(getEmptyBoard);
  const [board2State, setBoard2State] = useState(getEmptyBoard);

  // ships auto placement
  useEffect(() => setBoard1State(generateShips()), []);
  useEffect(() => setBoard2State(generateShips()), []);

  const genShipsButtonClick = () => setBoard1State(generateShips());
  const board2Click = (squareIndex) => {
    const squareStatus = board2State[squareIndex] === squareType.ship
      ? squareType.shot
      : squareType.miss;
    const newBoard2State = board2State.slice();
    newBoard2State[squareIndex] = squareStatus;
    setBoard2State(newBoard2State);
    makeSound(squareType[squareStatus]);
  };

  return (
    <div className="Game">
      <div className="boards">
        <Board className="player1" boardState={board1State} />
        <Board className="player2" boardState={board2State} onClick={board2Click} />
      </div>
      <Button
        className="genShipsButton"
        variant="contained"
        size="medium"
        endIcon={<AutorenewIcon />}
        onClick={genShipsButtonClick}
      >
        autoplace ships
      </Button>
    </div>
  );
}

export default Game;
