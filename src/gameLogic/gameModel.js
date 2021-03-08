import { squareType } from './constants';
import BoardModel from './boardModel';
import { makeSound } from '../utils/sounds';

class GameModel {
  constructor(boardSize, autoplay = false) {
    this.board1 = new BoardModel(boardSize);
    this.board2 = new BoardModel(boardSize);
    this.nextMove = 'player';
    this.autoplay = autoplay;
    this.state = 'on';
    this.botsTimeout = 1000;

    if (autoplay) this.playerBotMakeMove();
  }

  stopGame = () => {
    clearTimeout(this.botTimeoutId);
    clearTimeout(this.playerBotTimeoutId);
  }

  makeBotDecision = (board) => {
    const rand = (n) => Math.floor(Math.random() * n);
    const availableMoves = board
      .map((square, i) => [square, i])
      .filter(
        ([square, i]) => [squareType.ship, squareType.empty].includes(square),
      );
    const [, squareIndex] = availableMoves[rand(availableMoves.length)];
    return squareIndex;
  }

  playerMakeMove = (squareIndex) => {
    const newSquareStatus = this.board2.handleMove(squareIndex);
    if (!newSquareStatus) return; // second click on the same square
    makeSound(squareType[newSquareStatus]);
    this.nextMove = 'player2';
    this.updateBoard2State([...this.board2.squares]);
    this.botMakeMove();
  }

  playerBotMakeMove = () => {
    const squareIndex = this.makeBotDecision(this.board2.squares);
    this.playerBotTimeoutId = setTimeout(() => this.playerMakeMove(squareIndex), this.botsTimeout);
  };

  botMakeMove = () => {
    const id = setTimeout(() => { // slow down the bot decisions
      const squareIndex = this.makeBotDecision(this.board1.squares);
      const newSquareStatus = this.board1.handleMove(squareIndex);
      makeSound(squareType[newSquareStatus]);
      this.nextMove = 'player';
      this.updateBoard1State([...this.board1.squares]);
      if (this.autoplay) this.playerBotMakeMove();
    }, this.botsTimeout);
    this.botTimeoutId = id;
  }
}

export default GameModel;
