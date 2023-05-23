class Controller {
  #model;

  #view;

  constructor(Model, View) {
    this.#model = new Model(10, 10, 10);
    this.#view = new View();
    this.#view.draw(this.#model.gameField);
    this.#onShowTime(this.#model.time);
    this.#onShowSteps(this.#model.steps);
    this.#onShowNumberFlags(this.#model.numberMarkedCells);
    this.#onShowNumberRemainingMines(this.#model.numberMines);
    this.#model.bindShowTime(this.#onShowTime);
    this.#model.bindShowSteps(this.#onShowSteps);
    this.#model.bindShowWinStatus(this.#onShowWinStatus);
    this.#model.bindShowLostGameStatus(this.#onShowLostGameStatus);
    this.#model.bindShowNumberFlags(this.#onShowNumberFlags);
    this.#model.bindShowNumberRemainingMines(this.#onShowNumberRemainingMines);
    this.#model.bindDrawLostGame(this.#onDrawLostGame);
    this.#model.bindCellChanged(this.#onCellChanged);
    this.#model.bindHandleEndGame(this.#onHandleEndGame);
    this.#view.bindOpenCell(this.#handleOpenCell);
    this.#view.bindMarkCell(this.#handleMarkCell);
  }

  #onShowTime = (time) => {
    this.#view.showTime(time);
  };

  #onShowSteps = (steps) => {
    this.#view.showSteps(steps);
  };

  #onShowNumberFlags = (flags) => {
    this.#view.showNumberFlags(flags);
  };

  #onShowNumberRemainingMines = (mines) => {
    this.#view.showNumberRemainingMines(mines);
  };

  #onShowWinStatus = (message) => {
    this.#view.showWinStatus(message);
  };

  #onShowLostGameStatus = (message) => {
    this.#view.showLostGameStatus(message);
  };

  #onDrawLostGame = (gameField) => {
    this.#view.drawLostGame(gameField);
  };

  #onHandleEndGame = () => {
    this.#view.handleEndGame();
  };

  #onCellChanged = (gameField, isGameOver) => {
    this.#view.draw(gameField, isGameOver);
  };

  #handleOpenCell = (rowIndex, cellIndex) => {
    this.#model.openCell(rowIndex, cellIndex);
  };

  #handleMarkCell = (rowIndex, cellIndex) => {
    this.#model.markCell(rowIndex, cellIndex);
  };
}

exports.Controller = Controller;
