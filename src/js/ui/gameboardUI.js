export default class GameboardUI {
  static generate(player) {
    const type = player.isComputer() ? 'computer' : 'person';
    const container = document.getElementById(`${type}Board`);

    for (let i = 0; i < 10; i++) {
      const divContainer = document.createElement('div');
      divContainer.id = `row-${i}`;
      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.id = `${i},${j}`;
        divContainer.appendChild(div);
      }
      container.appendChild(divContainer);
    }
  }
}
