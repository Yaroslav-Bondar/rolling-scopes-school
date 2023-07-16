import createElement from '../../services/createElement'
import { LINE_NUMBERS_CLASSNAME } from '../../../constants/selectors'

class LineNumbers {
  private mountPoint: HTMLElement | null
  private numberLines: number
  private lineNumbersContainer: HTMLElement

  constructor(mountPointClassName: string, numberLines: number) {
    this.mountPoint = document.querySelector(`.${mountPointClassName}`)
    if(!this.mountPoint) {
      throw new Error('Mount point not found')
    }
    this.numberLines = 0
    this.lineNumbersContainer = createElement({tag: 'div', classes: [LINE_NUMBERS_CLASSNAME]})
    this.pushLines(numberLines)
    this.mountPoint.append(this.lineNumbersContainer)
  }

  public pushLines(numberLines: number): void {
    for (let number = 1; number <= numberLines; number += 1) {
      const line: HTMLElement = createElement({tag: 'span'})
      this.numberLines += 1
      line.textContent = this.numberLines.toString()
      this.lineNumbersContainer.append(line)
    }
  }
}

export default LineNumbers