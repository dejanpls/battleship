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

  static getCoordsFromEvent(event, player, shipLength) {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;

    return this.#generateCoordinates(player, [x, y], shipLength);
  }

  static #generateCoordinates(player, [x, y], length) {
    const direction = this.#getShipDirection();
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      const position = direction === 'horizontal' ? [x + i, y] : [x, y + i];
      if (
        !player.gameboard.validateCoordinates(position) ||
        player.gameboard.hasShipAt(position.join(','))
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
}
