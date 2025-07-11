import Gameboard from '../src/js/gameboard';

let gameboard = new Gameboard();
const horizCoord = [
  [9, 1],
  [9, 2],
  [9, 3],
  [9, 4],
  [9, 5],
];

const vertCoord = [
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
];

test('Ship is placed on valid horizontal coordinates', () => {
  expect(gameboard.placeShip(horizCoord)).toBe(true);
});

test('Ship is placed on valid vertical coordinates', () => {
  expect(gameboard.placeShip(vertCoord)).toBe(true);
});

test('Ship is on given position: [9, 2]', () => {
  const position = '9,2';
  expect(gameboard.hasShipAt(position)).toBe(true);
});

test('Ship is not on given position: [8, 0]', () => {
  const position = '8,0';
  expect(gameboard.hasShipAt(position)).toBe(false);
});

test('Ship is aligned:', () => {
  expect(gameboard.isAligned(horizCoord)).toBe(true);
});

test('Ship alignment failed:', () => {
  const invCoord = [
    [9, 1],
    [4, 2], // invalid
    [9, 3],
    [9, 4],
    [9, 5],
  ];
  expect(gameboard.isAligned(invCoord)).toBe(false);
});

test('Ship is attacked at [9, 2]:', () => {
  expect(gameboard.receiveAttack('9,2')).toEqual({
    coordinate: '9,2',
    result: 'hit',
    sunk: false,
  });
});

test('Ship is again attacked on same position:', () => {
  expect(gameboard.receiveAttack('9,2')).toEqual({
    result: 'invalid',
    coordinate: '9,2',
  });
});

test('Ship is missed at position [3, 2]:', () => {
  expect(gameboard.receiveAttack('3,2')).toEqual({
    result: 'miss',
    coordinate: '3,2',
  });
});

test('Not all ships are sunk', () => {
  expect(gameboard.allShipsSunk()).toBe(false);
});

test('Coordinate [1, 1] was never attacked', () => {
  expect(gameboard.alreadyAttacked('1,1')).toBe(false);
});

test('Coordinate [9, 2] was attacked', () => {
  expect(gameboard.alreadyAttacked('9,2')).toBe(true);
});
