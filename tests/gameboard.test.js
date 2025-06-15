import Gameboard from '../src/js/gameboard';

let gameboard = new Gameboard();

test('Ship is placed on valid coordinates', () => {
  const coordinates = [
    [9, 1],
    [9, 2],
    [9, 3],
    [9, 4],
    [9, 5],
  ];
  expect(gameboard.placeShip(coordinates)).toBe(true);
});

test('Ship is on given coordinates: [9, 2]', () => {
  const coordinates = '9,2';
  expect(gameboard.getShipAt(coordinates)).toBe(true);
});

test('Ship is not on given coordinates: [8, 0]', () => {
  const coordinates = '8,0';
  expect(gameboard.getShipAt(coordinates)).toBe(false);
});
