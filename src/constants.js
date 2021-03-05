export const BOARD_SIZE = 10;

export const squareType = {}; // enum
squareType[squareType.empty = 0] = 'empty';
squareType[squareType.ship = 1] = 'ship';
squareType[squareType.shipMargin = 2] = 'shipMargin';
squareType[squareType.shot = 3] = 'shot';
squareType[squareType.miss = 4] = 'miss';

// export const squareType = [
//   'empty',
//   'ship',
//   'shipMargin'
// ]
