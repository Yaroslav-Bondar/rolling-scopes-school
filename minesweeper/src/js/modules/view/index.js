const {
  OPENED_CELL_STATE,
} = require('../../constants/cellStates');
const {
  OPENED_CELL_COLOR,
  CLOSED_CELL_COLOR,
  INACTIVE_CELL_COLOR,
} = require('../../constants/colors');

class View {
  #root;

  #gameField;

  #ctx;

  #GAME_FIELD_ID = 'game-field';

  #GAME_FIELD_FALLBACK_TEXT = 'playing field for the classic minesweeper game';

  #CELL_WIDTH = 40;

  #CELL_HEIGHT = 40;

  constructor() {
    this.#root = document.getElementById('root');
    this.#gameField = document.createElement('canvas');
    this.#gameField.id = this.#GAME_FIELD_ID;
    this.#gameField.textContent = this.#GAME_FIELD_FALLBACK_TEXT;
    this.#ctx = this.#gameField.getContext('2d');
    this.#root.prepend(this.#gameField);
  }

  draw(gameField, isGameOver) {
    const rows = gameField.length;
    const columns = gameField[0].length;
    this.#gameField.width = this.#CELL_WIDTH * columns;
    this.#gameField.height = this.#CELL_HEIGHT * rows;
    gameField.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (isGameOver) {
          if (!cell[OPENED_CELL_STATE]) {
            this.#drawInactiveCell(rowIndex, cellIndex);
          } else {
            this.#drawOpenedCell(rowIndex, cellIndex);
          }
        } else if (cell[OPENED_CELL_STATE]) {
          this.#drawOpenedCell(rowIndex, cellIndex);
        } else {
          this.#drawClosedCell(rowIndex, cellIndex);
        }
      });
    });
  }

  #drawInactiveCell(rowIndex, cellIndex) {
    this.#ctx.strokeRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
    this.#ctx.fillStyle = INACTIVE_CELL_COLOR;
    this.#ctx.fillRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
  }

  #drawOpenedCell(rowIndex, cellIndex) {
    this.#ctx.strokeRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
    this.#ctx.fillStyle = OPENED_CELL_COLOR;
    this.#ctx.fillRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
  }

  #drawClosedCell(rowIndex, cellIndex) {
    this.#ctx.strokeRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
    this.#ctx.fillStyle = CLOSED_CELL_COLOR;
    this.#ctx.fillRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
  }

  bindOpenCell(handler) {
    this.#gameField.addEventListener('click', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      const cell = Math.floor(x / this.#CELL_WIDTH);
      const row = Math.floor(y / this.#CELL_HEIGHT);
      handler(row, cell);
    });
  }
}

exports.View = View;
