import createHeaderElement from './components/createHeaderElement'
import LineNumbers from './components/LineNumbers'
import { SELECTOR_FORM_ID,
        EDITOR_HEADER_CLASSNAME,
        VIEWER_HEADER_CLASSNAME,
        EDITOR_LINES_CLASSNAME,
        VIEWER_LINES_CLASSNAME,
        SELECTOR_INPUT_ID, } from '../constants/selectors'

class View {
  private editorLineNumbers: LineNumbers 
  private viewLineNumbers: LineNumbers
  private selectorForm: HTMLFormElement | null 
  private selectorInput: HTMLInputElement | null 
  
  constructor() {
    this.selectorForm = document.getElementById(SELECTOR_FORM_ID) as HTMLFormElement
    this.selectorInput = document.getElementById(SELECTOR_INPUT_ID) as HTMLInputElement
    if(!this.selectorForm) {
      throw Error('Form selector not found')
    }
    if(!this.selectorInput) {
      throw Error('Input for selector not found')
    }
    createHeaderElement({
      mountPointClassName: EDITOR_HEADER_CLASSNAME, 
      titleMessage: 'Css Editor',
      secondTitleMessage: 'style.css'
    })
    createHeaderElement({
      mountPointClassName: VIEWER_HEADER_CLASSNAME, 
      titleMessage: 'Html Viewer',
      secondTitleMessage: 'table.html'
    })
    this.editorLineNumbers = new LineNumbers(EDITOR_LINES_CLASSNAME, 20)
    this.viewLineNumbers = new LineNumbers(VIEWER_LINES_CLASSNAME, 20)
  }

  bindSumbitAnswer(handler: (answer: string) => void): void {
    const listenSubmit = (event: Event): void => {
      event.preventDefault()
      const selector = this.selectorInput?.value
      if(selector) {
        handler(selector)
      }
    }
    this.selectorForm?.addEventListener('submit', listenSubmit)
  }

  displayLevel<Type>(data: Type): void {
    console.log('display level', data)
  }
}

export default View

