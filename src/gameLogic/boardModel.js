import { squareType } from './constants';

class BoardModel {
  constructor(size) {
    this.size = size;
    this.squares = Array(this.size ** 2).fill(0);
    this.squares = this.generateShips();
  }

  static boardStat = (board) => {
    const shots = board.filter(
      (square) => ![squareType.ship, squareType.empty].includes(square),
    ).length;
    const hits = board.filter((square) => square === squareType.shot).length;
    return { shots, hits };
  }

  indexFromCoord = (x, y) => y * this.size + x;

  coordFromIndex = (i) => [i % this.size, Math.floor(i / this.size)];

  isValidPosition = (shipCoords, board) => shipCoords
    .map(([x, y]) => board[this.indexFromCoord(x, y)])
    .filter((value) => value)
    .length === 0;

  makeShipMargin = (ship) => {
    const marginModifiers = [[1, 0], [1, -1], [0, -1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [1, 1]];
    return ship
      .flatMap(([x, y]) => marginModifiers.map(([dx, dy]) => [x + dx, y + dy]))
      .filter(([x, y]) => x >= 0 && y >= 0 && x < this.size && y < this.size);
  }

  makeRandomShip = (shipSize, board, tries = 0) => {
    const rand = (n) => Math.floor(Math.random() * n);
    const isHor = Boolean(rand(2));
    let pos = [rand(this.size - shipSize + 1), rand(this.size)];
    pos = isHor ? pos : pos.reverse();
    const shipCoords = Array(shipSize)
      .fill(pos)
      .map(([x, y], i) => (isHor ? [x + i, y] : [x, y + i]));
    if (!this.isValidPosition(shipCoords, board)) {
      if (tries > 10) {
        throw new Error('failed positioning');
      }
      return this.makeRandomShip(shipSize, board, tries + 1);
    }
    return shipCoords;
  }

  generateShips = () => {
    const board = Array(this.size ** 2).fill(0);
    const shipsForBoardSize = [10, 7, 5].indexOf(this.size);
    const shipsToMake = [
      [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
      [3, 2, 2, 1, 1, 1],
      [2, 1, 1, 1],
    ][shipsForBoardSize];
    try {
      shipsToMake.forEach((size) => {
        const ship = this.makeRandomShip(size, board);
        ship.forEach(([x, y]) => {
          const i = this.indexFromCoord(x, y);
          board[i] = squareType.ship;
        });
        const shipMargin = this.makeShipMargin(ship);
        shipMargin.forEach(([x, y]) => {
          const i = this.indexFromCoord(x, y);
          if (board[i] === squareType.empty) {
            board[i] = squareType.shipMargin;
          }
        });
      });
    } catch {
      return this.generateShips();
    }
    return board.map((status) => (status === squareType.shipMargin ? squareType.empty : status));
  }

  handleMove = (squareIndex) => {
    const prevStatus = this.squares[squareIndex];
    if (prevStatus !== squareType.ship && prevStatus !== squareType.empty) return null;
    const newStatus = prevStatus === squareType.ship ? squareType.shot : squareType.miss;
    this.squares[squareIndex] = newStatus;
    return newStatus;
  }

  allShipsDestroyed = () => this.squares.filter((s) => s === squareType.ship).length === 0;
}

export default BoardModel;
