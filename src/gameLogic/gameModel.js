import { squareType, PLAYERS } from './constants';
import BoardModel from './boardModel';
import { makeSound } from '../utils/sounds';

class GameModel {
  constructor(boardSize, botsTimeout, firstMove = PLAYERS.player1, autoplay = false) {
    this.board1 = new BoardModel(boardSize);
    this.board2 = new BoardModel(boardSize);
    this.autoplay = autoplay;
    this.state = 'on';
    this.botsTimeout = botsTimeout;

    if (firstMove === PLAYERS.player1) {
      this.nextMove = PLAYERS.player1;
      if (autoplay) this.playerBotMakeMove();
    } else {
      this.nextMove = PLAYERS.player2;
      this.botMakeMove();
    }
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
    this.updateBoard2State([...this.board2.squares]);
    if (this.board2.allShipsDestroyed()) {
      this.state = 'win';
    } else {
      this.nextMove = PLAYERS.player2;
      this.botMakeMove();
    }
  }

  playerBotMakeMove = () => {
    const squareIndex = this.makeBotDecision(this.board2.squares);
    this.playerBotTimeoutId = setTimeout(() => this.playerMakeMove(squareIndex), this.botsTimeout);
  };

  botMakeMove = () => {
    const botMove = () => {
      const squareIndex = this.makeBotDecision(this.board1.squares);
      const newSquareStatus = this.board1.handleMove(squareIndex);
      makeSound(squareType[newSquareStatus]);
      this.updateBoard1State([...this.board1.squares]);
      if (this.board1.allShipsDestroyed()) {
        this.state = 'win';
      } else {
        this.nextMove = PLAYERS.player1;
        if (this.autoplay) this.playerBotMakeMove();
      }
    };
    // slow down bot decisions
    this.botTimeoutId = setTimeout(botMove, this.botsTimeout);
  }
}

export default GameModel;
