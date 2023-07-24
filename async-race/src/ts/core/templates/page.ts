import createElement from '../../services/createElement';

abstract class Page {
  protected static createTitle(text: string): HTMLElement {
    const title: HTMLElement = createElement({ tag: 'h1' });
    title.innerText = text;
    return title;
  }

  protected container: HTMLElement;

  constructor() {
    this.container = createElement({ tag: 'main' });
  }

  getPageHtml(): HTMLElement {
    return this.container;
  }
}

export default Page;
