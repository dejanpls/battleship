export default class GameboardUI {
  static generate(player) {
    const type = player.isComputer() ? 'computer' : 'person';
    const gameboard = document.getElementById(`${type}Board`);

    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');

      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.dataset.x = i;
        div.dataset.y = j;
        row.appendChild(div);
      }

      gameboard.appendChild(row);
    }
  }

  static placeShip(player) {
    const type = player.isComputer() ? 'computer' : 'person';
    const gameboard = document.getElementById(`${type}Board`);
    let shipLength = player.gameboard.nextShipSize();

    gameboard.addEventListener('mouseup', (event) => {
      const coords = this.getCoordsFromEvent(event, player, shipLength);
      this.highlightCell(coords, gameboard, 'ship');

      player.gameboard.placeShip(coords);
      shipLength = player.gameboard.nextShipSize();

      if (!shipLength) {
        gameboard.classList.add('disabled');
        gameboard.style.pointerEvents = 'none';

        console.log('All ships placed! Ready to start game.');
        // Call next game phase here (for tomorrow!!)
      }
    });

    gameboard.addEventListener('mouseover', (event) => {
      if (!event.target.classList.contains('cell')) return;

      // Clear previous preview
      gameboard
        .querySelectorAll('.cell.preview')
        .forEach((cell) => cell.classList.remove('preview'));

      const coords = this.getCoordsFromEvent(event, player, shipLength);
      this.highlightCell(coords, gameboard, 'preview');
    });
  }

  static generateCoordinates(player, [x, y], length, direction = 'horizontal') {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      const position = direction === 'horizontal' ? [x + i, y] : [x, y + 1];
      if (
        !player.gameboard.validateCoordinates(position) ||
        player.gameboard.hasShipAt(position.join(','))
      )
        return null;
      coordinates.push(position);
    }
    return coordinates;
  }

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

    return this.generateCoordinates(player, [x, y], shipLength);
  }
}
