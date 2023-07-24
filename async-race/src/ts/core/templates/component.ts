import createElement from '../../services/createElement';

abstract class Component {
  protected container: HTMLElement;

  constructor(htmlTag: string, cssClass: string) {
    this.container = createElement({ tag: htmlTag, classes: [cssClass] });
  }

  getComponentHtml(): HTMLElement {
    return this.container;
  }
}

export default Component;
