import Ship from '../src/js/ship';

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

test('Ship is not sunk', () => {
  expect(ship.isSunk()).toBe(false);
});

test('Ship is sunk after 3 hits', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('Ship is sunk and accepts no further hits', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit(); // one too manyj
  expect(ship.isSunk()).toBe(true);
});

test('Ship is hit once', () => {
  ship.hit();
  expect(ship.getHitCount()).toBe(1);
});
