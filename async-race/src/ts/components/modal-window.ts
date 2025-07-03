import { Component } from './component';

const enum ButtonSlotNames {
  Ok = 'ok-button',
  Cancel = 'cancel-button',
}

type UnderStyle = 'title' | 'message';

declare global {
  interface HTMLElementTagNameMap {
    'x-modal-window': ModalWindowComponent;
  }
}

class ModalWindowComponent extends Component {
  static get observedAttributes(): string[] {
    return [ModalWindowDataAttributes.Type, ModalWindowDataAttributes.Opened];
  }

  private readonly styles: Readonly<Record<ModalWindowTypes, Readonly<Record<UnderStyle, string>>>> = {
    info: {
      title: 'background-color: #00f; color: #fff;',
      message: 'color: blue; font-style: italic;',
    },
    error: {
      title: 'background-color: #f00; color: #fff',
      message: 'border: 2px solid red; font-weight: bold;',
    },
    warning: {
      title: 'background-color: #e0cf34; color: #333;',
      message: 'color: greenyellow;',
    },
  };

  private readonly defaultWindowType: ModalWindowTypes = ModalWindowTypes.Info;

  private readonly defaultWindowEventOk: ModalWindowEvents = ModalWindowEvents.Ok;

  private readonly defaultWindowEventCancel: ModalWindowEvents = ModalWindowEvents.Cancel;

  constructor() {
    super();
    const template = this.getElement<'template'>(document)('#modal-window-template');
    this.shadowDom.append(template.content.cloneNode(true));
    const background = this.getElement<'div'>()('.modal-window__background');
    const buttonContainer = this.getElement<'div'>()('.modal-window__buttons');
    background.addEventListener('click', this.handleClickCancelBtn.bind(this));
    buttonContainer.addEventListener('slotchange', this.handleButtonSlotChange.bind(this));
  }

  attributeChangedCallback(name: ModalWindowDataAttributes): void {
    if (name === ModalWindowDataAttributes.Type) {
      this.changeStyle(this.windowType);
    }
    if (name === ModalWindowDataAttributes.Opened) {
      this.toggleOpenState(this.windowOpened);
    }
  }

  connectedCallback() {
    if (this.windowType === null) {
      this.setAttribute(ModalWindowDataAttributes.Type, this.defaultWindowType);
    }
  }

  get windowType() {
    return this.getAttribute(ModalWindowDataAttributes.Type);
  }

  get windowOpened(): string | null {
    return this.getAttribute(ModalWindowDataAttributes.Opened);
  }

  get windowEventOk(): string | null {
    return this.getAttribute(ModalWindowDataAttributes.EventOk);
  }

  get windowEventCancel(): string | null {
    return this.getAttribute(ModalWindowDataAttributes.EventCancel);
  }

  private handleButtonSlotChange(event: Event) {
    event.stopPropagation();
    const slot: HTMLSlotElement = event.target as HTMLSlotElement;
    const assigned: Node[] = slot.assignedNodes();
    if (assigned.length > 1) throw new Error('There should be one button in the slot.');
    if (assigned.length <= 0) return;
    const btn: HTMLButtonElement = assigned[0] as HTMLButtonElement;
    const btnSlotName = btn.getAttribute('slot');
    if (btnSlotName === ButtonSlotNames.Ok) {
      btn.onclick = this.handleClickOkBtn.bind(this);
    } else if (btnSlotName === ButtonSlotNames.Cancel) {
      btn.onclick = this.handleClickCancelBtn.bind(this);
    }
  }

  private handleClickOkBtn(event: Event): void {
    event.stopPropagation();
    const eventOk: CustomEvent = new CustomEvent(this.windowEventOk || this.defaultWindowEventOk);
    this.dispatchEvent(eventOk);
  }

  private handleClickCancelBtn(event: Event): void {
    event.stopPropagation();
    const eventCancel: CustomEvent = new CustomEvent(this.windowEventCancel || this.defaultWindowEventCancel);
    this.dispatchEvent(eventCancel);
  }

  private changeStyle(type: string | null): void {
    const getDivElement = this.getElement<'div'>();
    const title = getDivElement('.modal-window__title');
    const message = getDivElement('.modal-window__message');
    if (type === null) {
      title.style.cssText = this.styles[this.defaultWindowType].title;
      message.style.cssText = this.styles[this.defaultWindowType].message;
      return;
    }
    if (!Object.keys(this.styles).includes(type)) throw new Error('The modal window type is incorrect.');
    // After checking, we can assert about this type.
    const windowType = type as ModalWindowTypes;
    title.style.cssText = this.styles[windowType].title;
    message.style.cssText = this.styles[windowType].message;
  }

  private toggleOpenState(state: string | null): void {
    const modalWindow = this.getElement<'div'>()('.modal-window');
    if (state === null) {
      modalWindow.style.display = 'none';
    } else if (state === ModalWindowStates.Opened) {
      modalWindow.style.display = 'flex';
    } else if (state === ModalWindowStates.Closed) {
      modalWindow.style.display = 'none';
    } else {
      throw new Error('The open state of the modal window is incorrect.');
    }
  }
}

customElements.define('x-modal-window', ModalWindowComponent);
