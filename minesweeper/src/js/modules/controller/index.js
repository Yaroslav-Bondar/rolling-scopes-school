class Controller {
  #model;

  #view;

  constructor(Model, View) {
    this.#model = new Model(10, 10, 50);
    this.#view = new View();
    this.#view.draw(this.#model.gameField);
    this.#model.bindOpenedCell(this.#onOpenedCell);
    this.#view.bindOpenCell(this.#handleOpenCell);
  }

  #onOpenedCell = (gameField, isGameOver) => {
    this.#view.draw(gameField, isGameOver);
  };

  #handleOpenCell = (row, cell) => {
    this.#model.openCell(row, cell);
  };
}

exports.Controller = Controller;
