import data from '../../assets/data/levels.json'

interface Data {
  [index: string]: {
    html: string
    answer: string
  }
}

class Model {
  // private answer: string
  private level: number
  private onLevelChanged: <Type>(data: Type) => void 
  private data: Data

  constructor() {
    this.data = data
    this.level = 0
    this.onLevelChanged = () => { console.log('test') }
  }

  bindLevelChanged(callback: <Type>(data: Type) => void) {
    this.onLevelChanged = callback
  }
  // bindWrongAnswer(callback) {
  //   this.onWrongAnwer = callback
  // }

  checkAnswer(answer: string): void {
    if(answer === this.data[this.level].answer) {
      this.level += 1
      this.onLevelChanged(this.data[this.level.toString()])
    } else {
      // this.onWrongAnwer()
    }
    // console.log('answer', answer)
    // console.log('data', data['0'])
  }

}

export default Model