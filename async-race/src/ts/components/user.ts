import { Component } from './component';
import { goTo, routes } from '../router';
import { createElement } from '../services';

declare global {
  interface HTMLElementTagNameMap {
    'x-user': UserComponent;
  }
}

class UserComponent extends Component {
  private userId: number | undefined = undefined;

  private readonly CLICK_HANDLER_ATTR_NAME = 'data-click-handler';

  constructor() {
    super();
    const container = createElement({
      classes: ['user'],
      attrs: [{ name: this.CLICK_HANDLER_ATTR_NAME, value: 'goToUser' }],
    });
    container.addEventListener('click', this.handleClick.bind(this));
    const name = createElement({ classes: ['user__name'] });
    const surname = createElement({ classes: ['user__surname'] });
    const postsBtn = createElement({
      tag: 'button',
      classes: ['user__posts-btn'],
      attrs: [{ name: this.CLICK_HANDLER_ATTR_NAME, value: 'goToPostsByUser' }],
    });
    postsBtn.textContent = 'Posts';
    container.append(name, surname, postsBtn);
    this.shadowDom.append(container);
  }

  protected handleClick(event: Event) {
    event.stopPropagation();
    const target = event.target as Element;
    const clickHandler = target
      .closest(`[${this.CLICK_HANDLER_ATTR_NAME}]`)
      ?.getAttribute(this.CLICK_HANDLER_ATTR_NAME);
    // @ts-ignore
    if (clickHandler && typeof this[clickHandler] === 'function') this[clickHandler]();
  }

  protected goToPostsByUser() {
    const id = String(this.userId);
    const url = routes.PostsByUser.reverse({ id });
    if (url) {
      goTo(url);
    }
  }

  protected goToUser() {
    const id = String(this.userId);
    const url = routes.User.reverse({ userid: id });
    if (url) {
      goTo(url);
    }
  }

  update({ firstName, id }: Record<string, any>) {
    this.userId = id;
    this.getElement<'div'>()('.user__name').textContent = firstName;
  }
}

customElements.define('x-user', UserComponent);
