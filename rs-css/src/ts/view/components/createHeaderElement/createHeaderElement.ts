import createElement from '../../services/createElement'

interface Data {
  mountPointClassName: string;
  titleMessage: string;
  secondTitleMessage: string;
}

function createHeaderElement(data: Data): void {
  const {
    mountPointClassName, 
    titleMessage, 
    secondTitleMessage,
  }: Data = data

  const mountPoint: HTMLElement | null = document.querySelector(`.${mountPointClassName}`)
  
  if (!mountPoint) {
    throw new Error('Mount point not found')
  }

  const headerElement: HTMLElement = createElement({tag: 'div', classes: ['element-header']})
  
  const titleElement: HTMLElement = createElement({tag: 'span'})
  titleElement.textContent = titleMessage
  
  const secondTitleElement: HTMLElement = createElement({tag: 'span'})
  secondTitleElement.textContent = secondTitleMessage
  
  headerElement.append(titleElement, secondTitleElement)
  mountPoint?.append(headerElement)
} 

export default createHeaderElement