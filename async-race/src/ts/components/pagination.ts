import { Component } from './component';
import { createElement } from '../services';

declare global {
  interface HTMLElementTagNameMap {
    'x-pagination': PaginationComponent;
  }
}

class PaginationComponent extends Component {
  static get observedAttributes(): string[] {
    return [
      PaginationDataAttributes.PageNumber,
      PaginationDataAttributes.NextBtnActive,
      PaginationDataAttributes.PrevBtnActive,
    ];
  }

  static switchActiveBtnState(state: string, btn: HTMLButtonElement): void {
    const button = btn;
    if (state === 'true') {
      button.disabled = false;
    } else if (state === 'false') {
      button.disabled = true;
    } else {
      throw Error('The attribute type must be a string with values of true or false');
    }
  }

  protected readonly defaultNextEvent = PaginationEvents.Next;

  protected readonly defaultPrevEvent = PaginationEvents.Prev;

  constructor() {
    super();
    const pagination = createElement({ classes: ['pagination'] });
    const nextBtn = createElement({ tag: 'button', classes: ['pagination__next'] });
    const prevBtn = createElement({ tag: 'button', classes: ['pagination__prev'] });
    const output = createElement({ tag: 'output', classes: ['pagination__output'] });
    nextBtn.textContent = '>>';
    nextBtn.addEventListener('click', this.handleNextClick.bind(this));
    prevBtn.textContent = '<<';
    prevBtn.addEventListener('click', this.handlePrevClick.bind(this));
    pagination.append(prevBtn, output, nextBtn);
    this.shadowDom.append(pagination);
  }

  attributeChangedCallback(name: PaginationDataAttributes, oldValue: null | string, newValue: string): void {
    if (name === PaginationDataAttributes.NextBtnActive) {
      PaginationComponent.switchActiveBtnState(newValue, this.getElement<'button'>()('.pagination__next'));
    }
    if (name === PaginationDataAttributes.PrevBtnActive) {
      PaginationComponent.switchActiveBtnState(newValue, this.getElement<'button'>()('.pagination__prev'));
    }
    if (name === PaginationDataAttributes.PageNumber) {
      if (!Number.isNaN(Number(newValue))) {
        this.getElement<'output'>()('.pagination__output').textContent = newValue;
      } else {
        throw new Error('The page number value is not a number');
      }
    }
  }

  protected get nextEvent(): string | null {
    return this.getAttribute(PaginationDataAttributes.NextEvent);
  }

  protected get prevEvent(): string | null {
    return this.getAttribute(PaginationDataAttributes.PrevEvent);
  }

  set nextClick(value: (event: Event) => void | null) {
    this.getElement<'button'>()('.pagination__next').onclick = value;
  }

  set prevClick(value: (event: Event) => void | null) {
    this.getElement<'button'>()('.pagination__prev').onclick = value;
  }

  protected handleNextClick(event: Event) {
    event.stopPropagation();
    if (this.getElement<'button'>()('.pagination__next').onclick) return;
    const nextEvent = new CustomEvent(this.nextEvent || this.defaultNextEvent);
    this.dispatchEvent(nextEvent);
  }

  protected handlePrevClick(event: Event) {
    event.stopPropagation();
    if (this.getElement<'button'>()('.pagination__prev').onclick) return;
    const prevEvent = new CustomEvent(this.prevEvent || this.defaultPrevEvent);
    this.dispatchEvent(prevEvent);
  }
}

customElements.define('x-pagination', PaginationComponent);
