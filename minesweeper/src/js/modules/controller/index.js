class Controller {
  #model;

  #view;

  constructor(Model, View) {
    this.#model = new Model(10, 10, 2);
    this.#view = new View();
    this.#view.draw(this.#model.gameField);
    this.#onShowTime(this.#model.time);
    this.#model.bindShowTime(this.#onShowTime);
    this.#model.bindCellChanged(this.#onCellChanged);
    this.#view.bindOpenCell(this.#handleOpenCell);
    this.#view.bindMarkCell(this.#handleMarkCell);
  }

  #onShowTime = (time) => {
    this.#view.showTime(time);
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
