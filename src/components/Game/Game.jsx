import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Board from '../Board/Board';
import BoardInfo from '../BoardInfo/BoardInfo';
import { getEmptyBoard, generateShips, boardStat } from '../../logic';
import { squareType } from '../../constants';
import { makeSound } from '../../sounds';
import './Game.css';

function Game() {
  const [board1State, setBoard1State] = useState(getEmptyBoard);
  const [board2State, setBoard2State] = useState(getEmptyBoard);

  // ships auto placement
  useEffect(() => setBoard1State(generateShips()), []);
  useEffect(() => setBoard2State(generateShips()), []);

  const player1Stat = boardStat(board2State);
  const player2Stat = boardStat(board1State);

  const newGameButtonClick = () => {
    setBoard1State(generateShips());
    setBoard2State(generateShips());
  };

  const board2Click = (squareIndex) => {
    const prevStatus = board2State[squareIndex];
    if (prevStatus !== squareType.ship && prevStatus !== squareType.empty) {
      return;
    }
    const newStatus = prevStatus === squareType.ship ? squareType.shot : squareType.miss;
    const newBoard2State = board2State.slice();
    newBoard2State[squareIndex] = newStatus;
    setBoard2State(newBoard2State);
    makeSound(squareType[newStatus]);
  };

  return (
    <div className="Game">
      <div className="boards">
        <div className="boardContainer">
          <BoardInfo className="player1" playerName="You" playerStat={player1Stat} />
          <Board className="player1" boardState={board1State} />
        </div>
        <div className="boardContainer">
          <BoardInfo className="player2" playerName="Bot" playerStat={player2Stat} />
          <Board className="player2" boardState={board2State} onClick={board2Click} />
        </div>
      </div>
      <Button
        className="genShipsButton"
        variant="contained"
        size="medium"
        endIcon={<AutorenewIcon />}
        onClick={newGameButtonClick}
      >
        new game
      </Button>
    </div>
  );
}

export default Game;
