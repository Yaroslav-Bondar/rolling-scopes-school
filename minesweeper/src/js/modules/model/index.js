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

  #timerId;

  #gameStatus;

  #WIN_GAME_STATUS = 'win';

  #GAME_LOST_STATUS = 'gameOver';

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

  #onShowNumberFlags;

  #onShowNumberRemainingMines;

  #onShowWinStatus;

  #onShowLostGameStatus;

  #onDrawLostGame;

  #onHandleEndGame;

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

  bindShowNumberFlags(handler) {
    this.#onShowNumberFlags = handler;
  }

  bindShowNumberRemainingMines(handler) {
    this.#onShowNumberRemainingMines = handler;
  }

  bindShowWinStatus(handler) {
    this.#onShowWinStatus = handler;
  }

  bindShowLostGameStatus(handler) {
    this.#onShowLostGameStatus = handler;
  }

  bindDrawLostGame(handler) {
    this.#onDrawLostGame = handler;
  }

  bindHandleEndGame(handler) {
    this.#onHandleEndGame = handler;
  }

  get time() {
    return this.#time;
  }

  get steps() {
    return this.#numberSteps;
  }

  get numberMarkedCells() {
    return this.#numberMarkedCells;
  }

  get numberMines() {
    return this.#numberMines;
  }

  get gameField() {
    return this.#gameField;
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
      this.#gameStatus = this.#GAME_LOST_STATUS;
      this.#onDrawLostGame(this.#gameField);
      this.#onShowLostGameStatus('Game over. Try again');
      this.#onHandleEndGame();
    } else if ( // open cell 
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
      this.#onCellChanged(this.#gameField);
    }
    // win
    if (
      (this.#numberMarkedMines === this.#numberMines)
      && (this.#numberOpenedCells + this.#numberMarkedMines) === this.#amountCells) {
      this.#stopTime();
      this.#gameStatus = this.#WIN_GAME_STATUS;
      this.#onShowWinStatus(
        `Win! You found all the mines in ${this.#time.minutes} minutes 
        ${this.#time.seconds} seconds and ${this.#numberSteps} moves!`,
      );
      this.#onHandleEndGame();
    }
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
      this.#gameStatus = this.#WIN_GAME_STATUS;
      this.#onShowWinStatus(
        `Win! You found all the mines in ${this.#time.minutes} minutes 
        ${this.#time.seconds} seconds and ${this.#numberSteps} moves!`,
      );
    }

    this.#onShowNumberFlags(this.#numberMarkedCells);
    this.#onShowNumberRemainingMines(this.#numberMines - this.#numberMarkedMines);
    this.#onCellChanged(this.#gameField);
  }
}

exports.Model = Model;
