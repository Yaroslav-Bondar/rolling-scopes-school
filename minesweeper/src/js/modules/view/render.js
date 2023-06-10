class Render {
  #GAME_FIELD_ID = 'game-field';

  #GAME_FIELD_FALLBACK_TEXT = 'playing field for the classic minesweeper game';

  #MINIMUM_NUMBER_MINES = 10;

  #MAXIMUM_NUMBER_MINES = 99;

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
    this.#minesweeperNumberMines.min = this.#MINIMUM_NUMBER_MINES;
    this.#minesweeperNumberMines.max = this.#MAXIMUM_NUMBER_MINES;
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

  get gameField() {
    return this.#gameField;
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
}

module.exports.Render = Render;
