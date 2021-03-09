import React, { useState, useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Board from '../Board/Board';
import BoardInfo from '../BoardInfo/BoardInfo';
import BoardSizeSlider from '../Slider/BoardSizeSlider';
import BotSpeedSlider from '../Slider/BotSpeedSlider';
import FirstMoveChoise from '../FirstMoveChoise/FirstMoveChoise';
import GameModel from '../../gameLogic/gameModel';
import BoardModel from '../../gameLogic/boardModel';
import { PLAYERS } from '../../gameLogic/constants';
import './Game.css';

function Game() {
  const [board1State, setBoard1State] = useState([]);
  const [board2State, setBoard2State] = useState([]);
  const [boardSize, setBoardSize] = useState(10);
  const [botsTimeout, setBotsTimeout] = useState(1000);
  const [firstMove, setFirstMove] = useState(PLAYERS.player1);

  const game = useRef({});

  const startNewGame = (autoplay = false) => {
    game.current.stopGame?.();
    game.current = new GameModel(boardSize, botsTimeout, firstMove, autoplay);
    setBoard1State(game.current.board1.squares);
    setBoard2State(game.current.board2.squares);
    game.current.updateBoard2State = setBoard2State;
    game.current.updateBoard1State = setBoard1State;
  };

  useEffect(() => {
    game.current.updateBoard1State = setBoard1State;
    game.current.updateBoard2State = setBoard2State;
  }, [board1State, board2State]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(startNewGame, []); // on mount

  // start new game when board size changed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(startNewGame, [boardSize]);

  const newGameButtonClick = () => startNewGame();

  const autoplayButtonClick = () => startNewGame(true);

  const board2Click = (squareIndex) => {
    if (game.current.nextMove !== PLAYERS.player1 || game.current.autoplay) return;
    game.current.playerMakeMove(squareIndex);
  };

  const handleBoardSizeChange = (event, value) => setBoardSize(value);

  const handleBotSpeedChange = (event, value) => {
    game.current.botsTimeout = value;
    setBotsTimeout(value);
  };

  const handleFirstMoveChange = (newValue) => setFirstMove(newValue);

  const player1Stat = BoardModel.boardStat(board2State);
  const player2Stat = BoardModel.boardStat(board1State);

  const buttonsStyle = { className: 'newGameButton', variant: 'contained', size: 'medium' };
  return (
    <div className="Game">
      <div className="boards">
        <div className="boardContainer">
          <BoardInfo className="player1" playerName="You" playerStat={player1Stat} />
          <Board className="player1" boardState={board1State} boardSize={boardSize} player />
        </div>
        <div className="boardContainer">
          <BoardInfo className="player2" playerName="Bot" playerStat={player2Stat} />
          <Board className="player2" boardState={board2State} onClick={board2Click} boardSize={boardSize} />
        </div>
      </div>
      <Button {...buttonsStyle} endIcon={<AutorenewIcon />} onClick={newGameButtonClick}>
        new game
      </Button>
      <Button {...buttonsStyle} endIcon={<AutorenewIcon />} onClick={autoplayButtonClick}>
        autoplay
      </Button>
      <Paper style={{ marginTop: '50px', padding: '25px' }} elevation={0}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs>
            <BoardSizeSlider onChange={handleBoardSizeChange} />
          </Grid>
          <Grid item xs>
            <BotSpeedSlider onChange={handleBotSpeedChange} />
          </Grid>
          <Grid item xs>
            <FirstMoveChoise onChange={handleFirstMoveChange} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Game;
