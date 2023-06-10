const { Render } = require('./render');

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
  ERROR_CELL_COLOR,
} = require('../../constants/colors');

class Draw extends Render {
  #MINE_ICON_PATH = './assets/img/icons/naval-mine.png';

  #MARK_ICON_PATH = './assets/img/icons/flag.png';

  #CELL_WIDTH = 40;

  #CELL_HEIGHT = 40;

  #MINE_WIDTH = 30;

  #MINE_HEIGHT = 30;

  #AMOUNT_MINE_FONT = '20px serif';

  #ctx = this.gameField.getContext('2d');

  // TODO: move the passing of the gameField parameter to the constructor
  draw(gameField) {
    const rows = gameField.length;
    const columns = gameField[0].length;
    this.gameField.width = this.#CELL_WIDTH * columns;
    this.gameField.height = this.#CELL_HEIGHT * rows;
    gameField.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell[OPENED_CELL_STATE]) {
          this.#drawOpenedCell(rowIndex, cellIndex, cell);
        } else if (cell[MARKED_CELL_STATE]) {
          this.#drawImage(rowIndex, cellIndex, this.#MARK_ICON_PATH);
          this.#drawClosedCell(rowIndex, cellIndex);
        } else {
          this.#drawClosedCell(rowIndex, cellIndex);
        }
      });
    });
  }

  drawLostGame(gameField) {
    gameField.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (!cell[OPENED_CELL_STATE] && !cell[MARKED_CELL_STATE]) {
          this.#drawInactiveCell(rowIndex, cellIndex);
        } else {
          this.#drawOpenedCell(rowIndex, cellIndex, cell);
        }
        if (cell[MARKED_CELL_STATE]) {
          this.#drawImage(rowIndex, cellIndex, this.#MARK_ICON_PATH);
          if (cell[MINED_CELL_STATE]) {
            this.#drawInactiveCell(rowIndex, cellIndex);
          } else {
            this.#drawErrorCell(rowIndex, cellIndex);
          }
        }
        if (cell[MINED_CELL_STATE] && !cell[MARKED_CELL_STATE]) {
          this.#drawImage(rowIndex, cellIndex, this.#MINE_ICON_PATH);
          if (cell[OPENED_CELL_STATE]) {
            this.#drawErrorCell(rowIndex, cellIndex);
          } else {
            this.#drawInactiveCell(rowIndex, cellIndex);
          }
        }
      });
    });
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

  #drawErrorCell(rowIndex, cellIndex) {
    this.#drawCell(rowIndex, cellIndex, ERROR_CELL_COLOR);
  }

  #drawInactiveCell(rowIndex, cellIndex) {
    this.#drawCell(rowIndex, cellIndex, INACTIVE_CELL_COLOR);
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

  makeRowIndex(coordinate) {
    return Math.floor(coordinate / this.#CELL_HEIGHT);
  }

  makeCellIndex(coordinate) {
    return Math.floor(coordinate / this.#CELL_WIDTH);
  }
}

module.exports.Draw = Draw;
