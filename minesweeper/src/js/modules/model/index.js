const { makeRandomNumber } = require('../../services/makeRandomNumber');
const {
  OPENED_CELL_STATE,
  FLAGGED_CELL_STATE,
  MINED_CELL_STATE,
} = require('../../constants/cellStates');

class Model {
  #gameField = [];

  #isGameFieldMined = false;

  #isGameOver = false;

  #rows;

  #columns;

  #numberMines;

  #CELL_DEFAULT_STATE = {
    [OPENED_CELL_STATE]: false,
    [FLAGGED_CELL_STATE]: false,
    [MINED_CELL_STATE]: false,
  };

  #onOpenedCell;

  constructor(rows, columns, numberMines) {
    if (rows * columns <= numberMines) throw new Error('Wrong number of mines');
    this.#rows = rows;
    this.#columns = columns;
    this.#numberMines = numberMines;
    this.#createPlayingField();
  }

  bindOpenedCell(handler) {
    this.#onOpenedCell = handler;
  }

  #createPlayingField() {
    for (let row = 0; row < this.#rows; row += 1) {
      this.#gameField[row] = [];
      for (let cell = 0; cell < this.#columns; cell += 1) {
        this.#gameField[row][cell] = { ...this.#CELL_DEFAULT_STATE };
      }
    }
  }

  get gameField() {
    return this.#gameField;
  }

  #minePlayingField = (nonIncludedRow, nonIncludedCell) => {
    for (let i = 0; i < this.#numberMines; i += 1) {
      let row;
      let cell;
      do {
        row = makeRandomNumber(this.#rows);
        cell = makeRandomNumber(this.#columns);
      } while (
        (row === nonIncludedRow && cell === nonIncludedCell)
        || this.#gameField[row][cell][MINED_CELL_STATE] === true
      );

      this.#gameField[row][cell][MINED_CELL_STATE] = true;
    }
    this.#isGameFieldMined = true;
  };

  openCell(row, cell) {
    if (!this.#isGameFieldMined) {
      this.#minePlayingField(row, cell);
    }
    if (this.#gameField[row][cell][MINED_CELL_STATE]) {
      this.#isGameOver = true;
    } else if (!this.#gameField[row][cell][OPENED_CELL_STATE]) {
      this.#gameField[row][cell][OPENED_CELL_STATE] = true;
    }
    this.#onOpenedCell(this.#gameField, this.#isGameOver);
  }
}

exports.Model = Model;
