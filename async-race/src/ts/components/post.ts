import { Component } from './component';
import { createElement } from '../services';

declare global {
  interface HTMLElementTagNameMap {
    'x-post': PostComponent;
  }
}

class PostComponent extends Component {
  constructor() {
    super();
    const container = createElement({ classes: ['post'] });
    const title = createElement({ classes: ['post__title'] });
    const body = createElement({ classes: ['post__body'] });
    container.append(title, body);
    this.shadowDom.append(container);
  }

  update({ title }: Record<string, any>) {
    const topic = this.getElement<'div'>()('.post__title');
    topic.textContent = title;
  }
}

customElements.define('x-post', PostComponent);
