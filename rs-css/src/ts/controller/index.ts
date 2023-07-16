import View from '../view'
import Model from '../model'

class Controller {
  view: View 
  model: Model 
  
  constructor() {
    this.model = new Model
    this.view = new View
    this.view.bindSumbitAnswer(this.handleCheckAnswer)
    this.model.bindLevelChanged(this.onLevelChanged)
  }

  handleCheckAnswer = (answer: string): void => {
    this.model.checkAnswer(answer)
  }

  onLevelChanged = <Type>(data: Type): void => {
    this.view.displayLevel(data)
  }
}

export default Controller