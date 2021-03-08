import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Board from '../Board/Board';
import BoardInfo from '../BoardInfo/BoardInfo';
import GameModel from '../../gameLogic/gameModel';
import BoardModel from '../../gameLogic/boardModel';
import './Game.css';

function Game() {
  const [board1State, setBoard1State] = useState([]);
  const [board2State, setBoard2State] = useState([]);

  const game = useRef({});

  const startNewGame = (boardSize, autoplay = false) => {
    game.current.stopGame?.();
    game.current = new GameModel(boardSize, autoplay);
    setBoard1State(game.current.board1.squares);
    setBoard2State(game.current.board2.squares);
    game.current.updateBoard2State = setBoard2State;
    game.current.updateBoard1State = setBoard1State;
  };

  useEffect(() => {
    game.current.updateBoard1State = setBoard1State;
    game.current.updateBoard2State = setBoard2State;
  }, [setBoard1State, setBoard2State]);

  useEffect(() => {
    startNewGame(10);
  }, []);

  const newGameButtonClick = () => {
    startNewGame(10);
  };

  const autoplayButtonClick = () => {
    startNewGame(10, true);
  };

  const board2Click = (squareIndex) => {
    if (game.current.nextMove !== 'player' || game.current.autoplay) return;
    game.current.playerMakeMove(squareIndex);
  };

  const player1Stat = BoardModel.boardStat(board1State);
  const player2Stat = BoardModel.boardStat(board2State);

  const buttonsStyle = { className: 'newGameButton', variant: 'contained', size: 'medium' };
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
      <Button {...buttonsStyle} endIcon={<AutorenewIcon />} onClick={newGameButtonClick}>
        new game
      </Button>
      <Button {...buttonsStyle} endIcon={<AutorenewIcon />} onClick={autoplayButtonClick}>
        autoplay
      </Button>
    </div>
  );
}

export default Game;
