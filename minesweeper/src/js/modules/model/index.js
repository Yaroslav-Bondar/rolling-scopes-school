const { makeRandomNumber } = require('../../services/makeRandomNumber');
const {
  OPENED_CELL_STATE,
  MARKED_CELL_STATE,
  MINED_CELL_STATE,
  NUMBER_CELL_STATE,
} = require('../../constants/cellStates');

class Model {
  #gameField = [];

  #isGameFieldMined = false;

  #isGameFieldNumbered = false;

  #isGameOver = false;

  #rows;

  #columns;

  #numberMines;

  #numberMarkedCells = 0;

  #CELL_DEFAULT_STATE = {
    [OPENED_CELL_STATE]: false,
    [MARKED_CELL_STATE]: false,
    [MINED_CELL_STATE]: false,
    [NUMBER_CELL_STATE]: 0,
  };

  #onCellChanged;

  constructor(rows, columns, numberMines) {
    if (rows * columns <= numberMines) throw new Error('Wrong number of mines');
    this.#rows = rows;
    this.#columns = columns;
    this.#numberMines = numberMines;
    this.#createPlayingField();
  }

  bindCellChanged(handler) {
    this.#onCellChanged = handler;
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

  #minePlayingField(nonIncludedRow, nonIncludedCell) {
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
  }

  #numberPlayingField() {
    this.#gameField.forEach(this.#iterateNumbering.bind(this));
    this.#isGameFieldNumbered = true;
  }

  #iterateNumbering(row, rowIndex) {
    row.forEach((cell, cellIndex) => {
      const neighbors = this.#findNeighbors(rowIndex, cellIndex);
      neighbors.forEach((address) => this.#numberCell(address, rowIndex, cellIndex));
    });
  }

  #numberCell(address, rowIndex, cellIndex) {
    const {
      rowIndex: neighborRowIndex,
      cellIndex: neighborCellIndex,
    } = address;
    if (this.#gameField[neighborRowIndex][neighborCellIndex][MINED_CELL_STATE]) {
      this.#gameField[rowIndex][cellIndex][NUMBER_CELL_STATE] += 1;
    }
  }

  #findNeighbors(rowIndex, cellIndex) {
    const neighbors = [];
    // iteration order clockwise
    if (this.#gameField[rowIndex][cellIndex - 1]) {
      neighbors.push({ rowIndex, cellIndex: cellIndex - 1 });
    }
    if (this.#gameField[rowIndex - 1] && this.#gameField[rowIndex - 1][cellIndex]) {
      neighbors.push({ rowIndex: rowIndex - 1, cellIndex });
    }
    if (this.#gameField[rowIndex][cellIndex + 1]) {
      neighbors.push({ rowIndex, cellIndex: cellIndex + 1 });
    }
    if (this.#gameField[rowIndex + 1] && this.#gameField[rowIndex + 1][cellIndex]) {
      neighbors.push({ rowIndex: rowIndex + 1, cellIndex });
    }
    // diagonal neighbors
    if (this.#gameField[rowIndex + 1] && this.#gameField[rowIndex + 1][cellIndex - 1]) {
      neighbors.push({ rowIndex: rowIndex + 1, cellIndex: cellIndex - 1 });
    }
    if (this.#gameField[rowIndex - 1] && this.#gameField[rowIndex - 1][cellIndex - 1]) {
      neighbors.push({ rowIndex: rowIndex - 1, cellIndex: cellIndex - 1 });
    }
    if (this.#gameField[rowIndex - 1] && this.#gameField[rowIndex - 1][cellIndex + 1]) {
      neighbors.push({ rowIndex: rowIndex - 1, cellIndex: cellIndex + 1 });
    }
    if (this.#gameField[rowIndex + 1] && this.#gameField[rowIndex + 1][cellIndex + 1]) {
      neighbors.push({ rowIndex: rowIndex + 1, cellIndex: cellIndex + 1 });
    }
    return neighbors;
  }

  openCell(rowIndex, cellIndex) {
    if (!this.#isGameFieldMined) {
      this.#minePlayingField(rowIndex, cellIndex);
    }
    if (!this.#isGameFieldNumbered) {
      this.#numberPlayingField();
    }
    if (this.#gameField[rowIndex][cellIndex][MINED_CELL_STATE]) {
      this.#isGameOver = true;
    } else if (!this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]) {
      this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE] = true;
      this.#openNeighboringCells(rowIndex, cellIndex);
    }
    this.#onCellChanged(this.#gameField, this.#isGameOver);
  }

  markCell(rowIndex, cellIndex) {
    this.#numberMarkedCells += 1;
    if (this.#numberMarkedCells >= this.#numberMines) return;

    if (!this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]) {
      this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE] = true;
    }
    this.#onCellChanged(this.#gameField);
  }

  #openNeighboringCells(rowIndex, cellIndex) {
    const neighborsAddress = this.#findNeighbors(rowIndex, cellIndex);
    const currentAddress = { rowIndex, cellIndex };
    neighborsAddress.forEach((neighborAddress) => this.#openAdjacentCell(
      neighborAddress,
      currentAddress,
      this.#openNeighboringCells.bind(this),
    ));
  }

  #openAdjacentCell(neighborAddress, currentAddress, fn) {
    const {
      rowIndex: neighborRowIndex,
      cellIndex: neighborCellIndex,
    } = neighborAddress;
    const {
      rowIndex: currentRowIndex,
      cellIndex: currentCellIndex,
    } = currentAddress;
    if (
      this.#gameField[currentRowIndex][currentCellIndex][NUMBER_CELL_STATE] === 0
      && !this.#gameField[neighborRowIndex][neighborCellIndex][MINED_CELL_STATE]
      && this.#gameField[neighborRowIndex][neighborCellIndex][NUMBER_CELL_STATE] > 0
      && !this.#gameField[neighborRowIndex][neighborCellIndex][OPENED_CELL_STATE]
    ) {
      this.#gameField[neighborRowIndex][neighborCellIndex][OPENED_CELL_STATE] = true;
    } else if (
      this.#gameField[currentRowIndex][currentCellIndex][NUMBER_CELL_STATE] === 0
      && !this.#gameField[neighborRowIndex][neighborCellIndex][MINED_CELL_STATE]
      && !this.#gameField[neighborRowIndex][neighborCellIndex][OPENED_CELL_STATE]
      && this.#gameField[neighborRowIndex][neighborCellIndex][NUMBER_CELL_STATE] === 0
    ) {
      this.#gameField[neighborRowIndex][neighborCellIndex][OPENED_CELL_STATE] = true;
      fn(neighborRowIndex, neighborCellIndex);
    }
  }
}

exports.Model = Model;
