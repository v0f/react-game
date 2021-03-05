import { BOARD_SIZE, squareType } from './constants';

const getEmptyBoard = () => Array(BOARD_SIZE ** 2).fill(0);

const indexFromCoord = (x, y) => y * BOARD_SIZE + x;

const coordFromIndex = (i) => [i % BOARD_SIZE, Math.floor(i / BOARD_SIZE)];

const rand = (n) => Math.floor(Math.random() * n);

const isValidPosition = (shipCoords, board) => shipCoords
  .map(([x, y]) => board[indexFromCoord(x, y)])
  .filter((value) => value)
  .length === 0;

const makeShipMargin = (ship) => {
  const marginModifiers = [[1, 0], [1, -1], [0, -1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [1, 1]];
  return ship
    .flatMap(([x, y]) => marginModifiers.map(([dx, dy]) => [x + dx, y + dy]))
    .filter(([x, y]) => x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE);
};

const makeRandomShip = (shipSize, board, tries = 0) => {
  const isHor = Boolean(rand(2));
  let pos = [rand(BOARD_SIZE - shipSize + 1), rand(BOARD_SIZE)];
  pos = isHor ? pos : pos.reverse();
  const shipCoords = Array(shipSize)
    .fill(pos)
    .map(([x, y], i) => (isHor ? [x + i, y] : [x, y + i]));
  if (!isValidPosition(shipCoords, board)) {
    if (tries > 10) {
      throw new Error('failed positioning');
    }
    return makeRandomShip(shipSize, board, tries + 1);
  }
  return shipCoords;
};

const generateShips = () => {
  const board = Array(BOARD_SIZE ** 2).fill(0);
  const shipsToMake = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  try {
    shipsToMake.forEach((size) => {
      const ship = makeRandomShip(size, board);
      ship.forEach(([x, y]) => {
        const i = indexFromCoord(x, y);
        board[i] = squareType.ship;
      });
      const shipMargin = makeShipMargin(ship);
      shipMargin.forEach(([x, y]) => {
        const i = indexFromCoord(x, y);
        if (board[i] === squareType.empty) {
          board[i] = squareType.shipMargin;
        }
      });
    });
  } catch {
    return generateShips();
  }
  return board.map((status) => (status === squareType.shipMargin ? squareType.empty : status));
};

const boardStat = (board) => {
  const shots = board.filter(
    (square) => ![squareType.ship, squareType.empty].includes(square),
  ).length;
  const hits = board.filter((square) => square === squareType.shot).length;
  return { shots, hits };
};

export {
  getEmptyBoard,
  generateShips,
  boardStat,
};
