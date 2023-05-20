const {
  OPENED_CELL_STATE,
  NUMBER_CELL_STATE,
  MINED_CELL_STATE,
  MARKED_CELL_STATE,
} = require('../../constants/cellStates');

const {
  OPENED_CELL_COLOR,
  CLOSED_CELL_COLOR,
  INACTIVE_CELL_COLOR,
  AMOUNT_MINE_COLOR,
} = require('../../constants/colors');

const {
  WIN_GAME_STATUS,
  GAME_OVER_STATUS,
} = require('../../constants/gameStatus');

class View {
  #root;

  #gameField;

  #ctx;

  #GAME_FIELD_ID = 'game-field';

  #GAME_FIELD_FALLBACK_TEXT = 'playing field for the classic minesweeper game';

  #MINE_ICON_PATH = './assets/img/icons/naval-mine.png';

  #MARK_ICON_PATH = './assets/img/icons/flag.png';

  #CELL_WIDTH = 40;

  #CELL_HEIGHT = 40;

  #MINE_WIDTH = 30;

  #MINE_HEIGHT = 30;

  #AMOUNT_MINE_FONT = '20px serif';

  constructor() {
    this.#root = document.getElementById('root');
    this.#gameField = document.createElement('canvas');
    this.#gameField.id = this.#GAME_FIELD_ID;
    this.#gameField.textContent = this.#GAME_FIELD_FALLBACK_TEXT;
    this.#ctx = this.#gameField.getContext('2d');
    this.#root.prepend(this.#gameField);
  }

  draw(gameField, gameStatus) {
    const rows = gameField.length;
    const columns = gameField[0].length;
    this.#gameField.width = this.#CELL_WIDTH * columns;
    this.#gameField.height = this.#CELL_HEIGHT * rows;
    gameField.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (gameStatus === GAME_OVER_STATUS) {
          this.#drawGameOver(rowIndex, cellIndex, cell);
        } else if (gameStatus === WIN_GAME_STATUS) {
          console.log('WIN !!!');
        } else if (cell[OPENED_CELL_STATE]) {
          this.#drawOpenedCell(rowIndex, cellIndex, cell);
        } else if (cell[MARKED_CELL_STATE]) {
          this.#drawImage(rowIndex, cellIndex, this.#MARK_ICON_PATH);
          this.#drawInactiveCell(rowIndex, cellIndex);
        } else {
          this.#drawClosedCell(rowIndex, cellIndex);
        }
      });
    });
  }

  #drawGameOver(rowIndex, cellIndex, cell) {
    if (!cell[OPENED_CELL_STATE]) {
      this.#drawInactiveCell(rowIndex, cellIndex);
    } else {
      this.#drawOpenedCell(rowIndex, cellIndex, cell);
    }
    if (cell[MINED_CELL_STATE]) {
      this.#drawImage(rowIndex, cellIndex, this.#MINE_ICON_PATH);
      this.#drawInactiveCell(rowIndex, cellIndex);
    }
  }

  #drawInactiveCell(rowIndex, cellIndex) {
    this.#drawCell(rowIndex, cellIndex, INACTIVE_CELL_COLOR);
  }

  #drawCell(rowIndex, cellIndex, bgColor) {
    this.#ctx.strokeRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
    this.#ctx.fillStyle = bgColor;
    this.#ctx.fillRect(
      cellIndex * this.#CELL_WIDTH,
      rowIndex * this.#CELL_HEIGHT,
      this.#CELL_WIDTH,
      this.#CELL_HEIGHT,
    );
  }

  #drawImage(rowIndex, cellIndex, imagePath) {
    const drawImage = (image) => {
      this.#ctx.drawImage(
        image,
        (cellIndex * this.#CELL_WIDTH) + ((this.#CELL_WIDTH - this.#MINE_WIDTH) / 2),
        (rowIndex * this.#CELL_HEIGHT) + ((this.#CELL_HEIGHT - this.#MINE_HEIGHT) / 2),
        this.#MINE_WIDTH,
        this.#MINE_HEIGHT,
      );
    };
    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
      drawImage(image);
    };
  }

  #drawOpenedCell(rowIndex, cellIndex, cell) {
    this.#drawCell(rowIndex, cellIndex, OPENED_CELL_COLOR);
    if (cell[NUMBER_CELL_STATE] > 0) {
      this.#ctx.textAlign = 'center';
      this.#ctx.textBaseline = 'middle';
      this.#ctx.font = this.#AMOUNT_MINE_FONT;
      this.#ctx.fillStyle = AMOUNT_MINE_COLOR;
      this.#ctx.fillText(
        cell[NUMBER_CELL_STATE],
        cellIndex * this.#CELL_WIDTH + this.#CELL_WIDTH / 2,
        rowIndex * this.#CELL_HEIGHT + this.#CELL_HEIGHT / 2,
      );
    }
  }

  #drawClosedCell(rowIndex, cellIndex) {
    this.#drawCell(rowIndex, cellIndex, CLOSED_CELL_COLOR);
  }

  bindOpenCell(handler) {
    this.#gameField.addEventListener('click', (event) => {
      this.#handleClick(event, handler);
    });
  }

  bindMarkCell(handler) {
    this.#gameField.addEventListener('contextmenu', (event) => {
      this.#handleClick(event, handler);
    });
  }

  #handleClick(event, handler) {
    event.preventDefault();
    const x = event.offsetX;
    const y = event.offsetY;
    const rowIndex = Math.floor(y / this.#CELL_HEIGHT);
    const cellIndex = Math.floor(x / this.#CELL_WIDTH);
    handler(rowIndex, cellIndex);
  }
}

exports.View = View;
