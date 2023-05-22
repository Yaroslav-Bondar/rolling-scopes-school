const { makeRandomNumber } = require('../../services/makeRandomNumber');

const {
  OPENED_CELL_STATE,
  MARKED_CELL_STATE,
  MINED_CELL_STATE,
  NUMBER_CELL_STATE,
} = require('../../constants/cellStates');

const {
  WIN_GAME_STATUS,
  GAME_OVER_STATUS,
} = require('../../constants/gameStatus');

class Model {
  #gameField = [];

  #isGameFieldMined = false;

  #isGameFieldNumbered = false;

  #timerId;

  #gameStatus;

  #rows;

  #columns;

  #numberMines;

  #amountCells;

  #numberMarkedCells = 0;

  #numberMarkedMines = 0;

  #numberOpenedCells = 0;

  #numberSteps = 0;

  #time = {
    minutes: 0,
    seconds: 0,
  };

  #CELL_DEFAULT_STATE = {
    [OPENED_CELL_STATE]: false,
    [MARKED_CELL_STATE]: false,
    [MINED_CELL_STATE]: false,
    [NUMBER_CELL_STATE]: 0,
  };

  #onShowTime;

  #onShowSteps;

  #onShowWinStatus;

  #onShowEndGameStatus;

  #onCellChanged;

  constructor(rows, columns, numberMines) {
    if (rows * columns <= numberMines) throw new Error('Wrong number of mines');
    this.#rows = rows;
    this.#columns = columns;
    this.#amountCells = rows * columns;
    this.#numberMines = numberMines;
    this.#createPlayingField();
  }

  bindCellChanged(handler) {
    this.#onCellChanged = handler;
  }

  bindShowSteps(handler) {
    this.#onShowSteps = handler;
  }

  bindShowTime(handler) {
    this.#onShowTime = handler;
  }

  bindShowWinStatus(handler) {
    this.#onShowWinStatus = handler;
  }

  bindShowEndGameStatus(handler) {
    this.#onShowEndGameStatus = handler;
  }

  get time() {
    return this.#time;
  }

  get steps() {
    return this.#numberSteps;
  }

  #startTime() {
    let seconds = Date.now();
    let minutes = 0;

    function countTime() {
      let currentSecond = Math.trunc((Date.now() - seconds) / 1000);
      if (currentSecond === 60) {
        currentSecond = 0;
        seconds = Date.now();
        minutes += 1;
      }

      const time = {
        minutes,
        seconds: currentSecond,
      };

      this.#time = { ...time };

      this.#onShowTime(time);
    }

    this.#timerId = setInterval(countTime.bind(this), 1000);
  }

  #stopTime() {
    clearInterval(this.#timerId);
    this.#timerId = null;
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
  }

  #numberPlayingField() {
    this.#gameField.forEach(this.#iterateNumbering.bind(this));
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
      this.#isGameFieldMined = true;
    }
    if (!this.#isGameFieldNumbered) {
      this.#numberPlayingField();
      this.#isGameFieldNumbered = true;
    }
    if (!this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]) {
      this.#numberSteps += 1;
      this.#onShowSteps(this.#numberSteps);
    }
    // game over
    if (
      this.#gameField[rowIndex][cellIndex][MINED_CELL_STATE]
      && !this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE]
    ) {
      this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE] = true;
      this.#numberOpenedCells += 1;
      this.#stopTime();
      this.#gameStatus = GAME_OVER_STATUS;
      this.#onShowEndGameStatus('Game over. Try again');
    } else if (
      !this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]
      && !this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE]
    ) {
      this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE] = true;
      this.#numberOpenedCells += 1;
      if (!this.#timerId) {
        this.#startTime();
      }
      if (this.#gameField[rowIndex][cellIndex][NUMBER_CELL_STATE] === 0) {
        this.#openNeighboringCells(rowIndex, cellIndex);
      }
    }
    // win
    if (
      (this.#numberMarkedMines === this.#numberMines)
      && (this.#numberOpenedCells + this.#numberMarkedMines) === this.#amountCells) {
      this.#stopTime();
      this.#gameStatus = WIN_GAME_STATUS;
      this.#onShowWinStatus(
        `Win! You found all the mines in ${this.#time.minutes} minutes 
        ${this.#time.seconds} seconds and ${this.#numberSteps} moves!`,
      );
    }

    this.#onCellChanged(this.#gameField, this.#gameStatus);
  }

  #openNeighboringCells(rowIndex, cellIndex) {
    const neighborsAddress = this.#findNeighbors(rowIndex, cellIndex);
    neighborsAddress.forEach((neighborAddress) => this.#openAdjacentCell(
      neighborAddress,
      this.#openNeighboringCells.bind(this),
    ));
  }

  #openAdjacentCell(neighborAddress, fn) {
    const {
      rowIndex: neighborRowIndex,
      cellIndex: neighborCellIndex,
    } = neighborAddress;
    if (
      !this.#gameField[neighborRowIndex][neighborCellIndex][MINED_CELL_STATE]
      && !this.#gameField[neighborRowIndex][neighborCellIndex][OPENED_CELL_STATE]
    ) {
      this.#gameField[neighborRowIndex][neighborCellIndex][OPENED_CELL_STATE] = true;
      this.#numberOpenedCells += 1;
      if (this.#gameField[neighborRowIndex][neighborCellIndex][MARKED_CELL_STATE]) {
        this.#gameField[neighborRowIndex][neighborCellIndex][MARKED_CELL_STATE] = false;
      }
      if (this.#gameField[neighborRowIndex][neighborCellIndex][NUMBER_CELL_STATE] === 0) {
        fn(neighborRowIndex, neighborCellIndex);
      }
    }
  }

  markCell(rowIndex, cellIndex) {
    // TODO: optimize logic
    if (!this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]) {
      this.#numberSteps += 1;
      this.#onShowSteps(this.#numberSteps);
    }
    if (
      !this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]
      && !this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE]
      && !this.#gameField[rowIndex][cellIndex][MINED_CELL_STATE]
    ) {
      this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE] = true;
      this.#numberMarkedCells += 1;
    } else if (
      !this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]
      && this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE]
      && !this.#gameField[rowIndex][cellIndex][MINED_CELL_STATE]
    ) {
      this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE] = false;
      this.#numberMarkedCells -= 1;
    } else if (
      !this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]
      && !this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE]
      && this.#gameField[rowIndex][cellIndex][MINED_CELL_STATE]
    ) {
      this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE] = true;
      this.#numberMarkedCells += 1;
      this.#numberMarkedMines += 1;
    } else if (
      !this.#gameField[rowIndex][cellIndex][OPENED_CELL_STATE]
      && this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE]
      && this.#gameField[rowIndex][cellIndex][MINED_CELL_STATE]
    ) {
      this.#gameField[rowIndex][cellIndex][MARKED_CELL_STATE] = false;
      this.#numberMarkedCells -= 1;
      this.#numberMarkedMines -= 1;
    }
    if (
      (this.#numberMarkedMines === this.#numberMines)
      && (this.#numberOpenedCells + this.#numberMarkedMines) === this.#amountCells) {
      this.#stopTime();
      this.#gameStatus = WIN_GAME_STATUS;
      this.#onShowWinStatus(
        `Win! You found all the mines in ${this.#time.minutes} minutes 
        ${this.#time.seconds} seconds and ${this.#numberSteps} moves!`,
      );
    }

    this.#onCellChanged(this.#gameField, this.#gameStatus);
  }
}

exports.Model = Model;
