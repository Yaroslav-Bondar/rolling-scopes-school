const { Draw } = require('./draw');

class View extends Draw {
  handleEndGame() {
    this.removeEventHandler(this.gameField, 'oncontextmenu');
    this.removeEventHandler(this.gameField, 'onclick');
  }

  bindOpenCell(handler) {
    this.gameField.onclick = (event) => {
      this.#handleClick(event, handler);
    };
  }

  bindMarkCell(handler) {
    this.gameField.oncontextmenu = (event) => {
      this.#handleClick(event, handler);
    };
  }

  #handleClick(event, handler) {
    event.preventDefault();
    const x = event.offsetX;
    const y = event.offsetY;
    const rowIndex = this.makeRowIndex(y);
    const cellIndex = this.makeCellIndex(x);
    handler(rowIndex, cellIndex);
  }

  removeEventHandler(object, eventName) {
    const obj = object;
    obj[eventName] = null;
  }
}

exports.View = View;
