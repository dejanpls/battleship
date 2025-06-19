export default class UI {
  static highlightCell(coords, gameboard, className) {
    if (!coords) return;
    for (const [cx, cy] of coords) {
      const cell = gameboard.querySelector(
        `.cell[data-x="${cx}"][data-y="${cy}"]`
      );
      if (cell) cell.classList.add(className);
    }
  }

  static highlightTarget([cx, cy], gameboard, className) {
    if (![cx, cy]) return;

    const cell = gameboard.querySelector(
      `.cell[data-x="${cx}"][data-y="${cy}"]`
    );
    if (cell) cell.classList.add(className);
  }

  static getCoordsFromEvent(event, player, shipLength) {
    const key = this.getKeyFromEvent(event);

    return this.#generateCoordinates(player, key, shipLength);
  }

  static setShipDirection(rotateBtn) {
    if (rotateBtn.getAttribute('data-rotation') === 'horizontal') {
      rotateBtn.setAttribute('data-rotation', 'vertical');
    } else {
      rotateBtn.setAttribute('data-rotation', 'horizontal');
    }
  }

  static getKeyFromEvent(event) {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;
    return [x, y];
  }

  static #generateCoordinates(player, [x, y], length) {
    const direction = this.#getShipDirection();
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      const position = direction === 'horizontal' ? [x + i, y] : [x, y + i];
      if (
        !player.gameboard.validateCoordinates(position) ||
        player.gameboard.hasShipAt(position.join(',')) ||
        player.gameboard.hasAdjacentShip(position)
      )
        return null;
      coordinates.push(position);
    }
    return coordinates;
  }

  static #getShipDirection() {
    const rotateBtn = document.getElementById('rotateBtn');
    return rotateBtn.getAttribute('data-rotation');
  }

  static #generateComputerMove(computer) {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const key = [x, y];

      if (!computer.gameboard.hasShipAt(key.join(','))) {
        return key;
      }
    }
  }

  static #generateComputerCoord(direction, player, pos, length) {
    const coordinates = [];
    const x = pos[0];
    const y = pos[1];
    for (let i = 0; i < length; i++) {
      const position = direction === 'horizontal' ? [x + i, y] : [x, y + i];
      if (
        !player.gameboard.validateCoordinates(position) ||
        player.gameboard.hasShipAt(position.join(',')) ||
        player.gameboard.hasAdjacentShip(position)
      )
        return null;
      coordinates.push(position);
    }
    return coordinates;
  }

  static generateComputerPositions(computer) {
    const gameboard = document.getElementById(`computerBoard`);

    let shipLength = computer.gameboard.nextShipSize();

    while (shipLength) {
      const position = this.#generateComputerMove(computer);
      const dir = ['horizontal', 'vertical'][Math.floor(Math.random() * 2)];
      const coords = this.#generateComputerCoord(
        dir,
        computer,
        position,
        shipLength
      );
      this.highlightCell(coords, gameboard, 'ship');

      if (coords) {
        computer.gameboard.placeShip(coords);
        shipLength = computer.gameboard.nextShipSize();

        if (!shipLength) {
          console.log('Generated all computer ship positions.');
        }
      }
    }
  }

  static hideRotateBtn() {
    const rotateBtn = document.getElementById('rotateBtn');

    rotateBtn.classList.add('hidden');
  }

  static updateGameInfo(message) {
    document.getElementById('gameInfo').textContent = message;
  }
}
