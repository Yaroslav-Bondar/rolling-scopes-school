interface Data {
  tag: string;
  id?: string;
  classes?: string[];
  attributeName?: string;
  attributeValue?: string;
}

function createElement(data: Data): HTMLElement {
  const {
    tag,
    id,
    classes,
    attributeName,
    attributeValue,
  }: Data = data;
  const element: HTMLElement = document.createElement(tag);
  if (id?.length) {
    element.id = id;
  }
  function addClass(className: string): void {
    if (className.length) {
      element.classList.add(className);
    }
  }
  if (classes?.length) {
    classes.forEach(addClass);
  }
  if (attributeName?.length && attributeValue?.length) {
    element.setAttribute(attributeName, attributeValue);
  }
  return element;
}

export default createElement;
