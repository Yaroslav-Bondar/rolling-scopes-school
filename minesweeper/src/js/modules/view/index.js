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

class View {
  #GAME_FIELD_ID = 'game-field';

  #GAME_FIELD_FALLBACK_TEXT = 'playing field for the classic minesweeper game';

  #MINE_ICON_PATH = './assets/img/icons/naval-mine.png';

  #MARK_ICON_PATH = './assets/img/icons/flag.png';

  #CELL_WIDTH = 40;

  #CELL_HEIGHT = 40;

  #MINE_WIDTH = 30;

  #MINE_HEIGHT = 30;

  #AMOUNT_MINE_FONT = '20px serif';

  #root = document.getElementById('root');

  #main = this.createElement({ tag: 'div', classes: ['main'] });

  #mainContainer = this.createElement({ tag: 'div', classes: ['main__container', 'container'] });

  #minesweeper = this.createElement({ tag: 'div', classes: ['minesweeper'] });

  #minesweeperContainer = this.createElement({ tag: 'div', classes: ['minesweeper__container'] });

  #minesweeperGameField = this.createElement({ tag: 'div', classes: ['minesweeper__game'] });

  #minesweeperDisplay = this.createElement({ tag: 'div', classes: ['minesweeper__display'] });

  #minesweeperGameStatus = this.createElement({ tag: 'output', classes: ['minesweeper__game-status'] });

  #minesweeperTime = this.createElement({ tag: 'output', classes: ['minesweeper__time'] });

  #minesweeperSteps = this.createElement({ tag: 'output', classes: ['minesweeper__steps'] });

  #minesweeperFlags = this.createElement({ tag: 'output', classes: ['minesweeper__flags'] });

  #minesweeperMines = this.createElement({ tag: 'output', classes: ['minesweeper__mines'] });

  #minesweeperModes = this.createElement({ tag: 'form', classes: ['minesweeper__modes'] });

  #minesweeperLevels = this.createElement({ tag: 'section', classes: ['minesweeper__levels'] });

  #minesweeperDimensions = this.createElement({ tag: 'fieldset', classes: ['minesweeper__dimensions'] });

  #minesweeperEasyLabel = this.createElement({ tag: 'label', classes: ['minesweeper__easy-label'] });

  #minesweeperEasy = this.createElement({ tag: 'input', classes: ['minesweeper__easy'] });

  #minesweeperMediumLabel = this.createElement({ tag: 'label', classes: ['minesweeper__medium-label'] });

  #minesweeperMedium = this.createElement({ tag: 'input', classes: ['minesweeper__medium'] });

  #minesweeperHardLabel = this.createElement({ tag: 'label', classes: ['minesweeper__hard-label'] });

  #minesweeperHard = this.createElement({ tag: 'input', classes: ['minesweeper__hard'] });

  #minesweeperChoiceNumberMines = this.createElement({ tag: 'p', classes: ['minesweeper__choice-number-mines'] });

  #minesweeperNumberMinesLabel = this.createElement({ tag: 'label', classes: ['minesweeper__number-mines-label'] });

  #minesweeperNumberMines = this.createElement({ tag: 'input', classes: ['minesweeper__number-mines'] });

  #gameField = this.createElement({ tag: 'canvas', id: this.#GAME_FIELD_ID, classes: ['minesweeper__game-field'] });

  #ctx = this.#gameField.getContext('2d');

  constructor() {
    this.#minesweeperGameField.prepend(this.#gameField);
    this.#minesweeperContainer.prepend(
      this.#minesweeperModes,
      this.#minesweeperGameField,
      this.#minesweeperDisplay,
    );
    this.#minesweeperEasy.type = 'radio';
    this.#minesweeperEasy.name = 'size';
    this.#minesweeperEasy.value = 'easy';
    this.#minesweeperEasyLabel.textContent = 'Easy 10 x 10';
    this.#minesweeperMedium.type = 'radio';
    this.#minesweeperMedium.name = 'size';
    this.#minesweeperMedium.value = 'medium';
    this.#minesweeperMediumLabel.textContent = 'Medium 15 x 15';
    this.#minesweeperHard.type = 'radio';
    this.#minesweeperHard.name = 'size';
    this.#minesweeperHard.value = 'hard';
    this.#minesweeperHardLabel.textContent = 'Hard 25 x 25';
    this.#minesweeperEasyLabel.prepend(this.#minesweeperEasy);
    this.#minesweeperMediumLabel.prepend(this.#minesweeperMedium);
    this.#minesweeperHardLabel.prepend(this.#minesweeperHard);
    this.#minesweeperNumberMines.type = 'number';
    this.#minesweeperNumberMines.min = 10;
    this.#minesweeperNumberMines.max = 99;
    this.#minesweeperNumberMines.name = 'number-mines';
    this.#minesweeperChoiceNumberMines.prepend(this.#minesweeperNumberMinesLabel);
    this.#minesweeperNumberMinesLabel.textContent = 'Number of mines';
    this.#minesweeperNumberMinesLabel.prepend(this.#minesweeperNumberMines);
    this.#minesweeperDimensions.prepend(
      this.createList(
        [
          this.#minesweeperHardLabel,
          this.#minesweeperMediumLabel,
          this.#minesweeperEasyLabel,
        ],
        'minesweeper__dimensions-list',
      ),
    );
    this.#minesweeperLevels.prepend(
      this.#minesweeperDimensions,
      this.#minesweeperChoiceNumberMines,
    );
    this.#minesweeperModes.prepend(this.#minesweeperLevels);
    this.#minesweeperDisplay.prepend(
      this.#minesweeperTime,
      this.#minesweeperSteps,
      this.#minesweeperFlags,
      this.#minesweeperMines,
      this.#minesweeperGameStatus,
    );
    this.#minesweeper.append(this.#minesweeperContainer);
    this.#mainContainer.append(this.#minesweeper);
    this.#main.append(this.#mainContainer);
    this.#gameField.textContent = this.#GAME_FIELD_FALLBACK_TEXT;
    this.#root.prepend(this.#main);
  }

  createElement(data = {}) {
    const {
      tag,
      id,
      classes,
      attributeName,
      attributeValue,
    } = data;

    if (!Array.isArray(classes)) {
      throw new Error('Classes must be listed in an array.');
    }

    const element = document.createElement(tag);

    if (id) {
      element.id = id;
    }

    function addClass(className) {
      if (typeof className !== 'string') {
        throw new Error('Class name must be a string.');
      }
      if (className) {
        element.classList.add(className);
      }
    }

    if (classes.length) {
      classes.forEach(addClass);
    }

    if (attributeName && attributeValue) {
      element.setAttribute(attributeName, `${attributeValue}`);
    }

    return element;
  }

  createList(items, listClassName, elementClassName) {
    const ul = this.createElement({ tag: 'ul', classes: [listClassName ? `${listClassName}` : ''] });

    function iterate(item) {
      const li = this.createElement({ tag: 'li', classes: [elementClassName ? `${elementClassName}` : ''] });
      li.append(item);
      ul.prepend(li);
    }

    items.forEach(iterate.bind(this));

    return ul;
  }

  showTime(time = {}) {
    let {
      minutes,
      seconds,
    } = time;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    this.#minesweeperTime.textContent = `Time: ${minutes}:${seconds}`;
  }

  showSteps(steps) {
    this.#minesweeperSteps.textContent = `Steps: ${steps}`;
  }

  showNumberFlags(flags) {
    this.#minesweeperFlags.textContent = `Flags: ${flags}`;
  }

  showNumberRemainingMines(mines) {
    this.#minesweeperMines.textContent = `Remaining mines: ${mines}`;
  }

  showWinStatus(message) {
    this.#minesweeperGameStatus.textContent = message;
  }

  showLostGameStatus(message) {
    this.#minesweeperGameStatus.textContent = message;
  }

  handleEndGame() {
    this.removeEventHandler(this.#gameField, 'oncontextmenu');
    this.removeEventHandler(this.#gameField, 'onclick');
  }

  // TODO: move the passing of the gameField parameter to the constructor
  draw(gameField) {
    const rows = gameField.length;
    const columns = gameField[0].length;
    this.#gameField.width = this.#CELL_WIDTH * columns;
    this.#gameField.height = this.#CELL_HEIGHT * rows;
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

  bindOpenCell(handler) {
    this.#gameField.onclick = (event) => {
      this.#handleClick(event, handler);
    };
  }

  bindMarkCell(handler) {
    this.#gameField.oncontextmenu = (event) => {
      this.#handleClick(event, handler);
    };
  }

  #handleClick(event, handler) {
    event.preventDefault();
    const x = event.offsetX;
    const y = event.offsetY;
    const rowIndex = Math.floor(y / this.#CELL_HEIGHT);
    const cellIndex = Math.floor(x / this.#CELL_WIDTH);
    handler(rowIndex, cellIndex);
  }

  removeEventHandler(object, eventName) {
    const obj = object;
    obj[eventName] = null;
  }
}

exports.View = View;
