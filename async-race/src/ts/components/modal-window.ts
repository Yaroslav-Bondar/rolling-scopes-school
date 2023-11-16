import isValueInEnum from '../services/isValueInEnum';

enum WindowTypes {
  Error = ModalWindowTypes.Error,
  Info = ModalWindowTypes.Info,
  Warning = ModalWindowTypes.Warning,
}

declare const enum ModalWindowButtonIds {
  Ok = 'ok-button',
  Cancel = 'cancel-button',
}

class ModalWindow extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      ModalWindowDataAttributes.Type,
      ModalWindowDataAttributes.Opened,
    ];
  }

  private shadow: ShadowRoot;

  private defaultWindowType: ModalWindowTypes = ModalWindowTypes.Info;

  private defaultWindowEventOk: ModalWindowEvents = ModalWindowEvents.Ok;

  private defaultWindowEventCancel: ModalWindowEvents = ModalWindowEvents.Cancel;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    const template: HTMLTemplateElement | null = document.getElementById('modal-window-template') as HTMLTemplateElement;
    if (!template) {
      throw new Error('Missing template.');
    }
    const templateContent: HTMLElement = template.content.cloneNode(true) as HTMLElement;
    const style: HTMLElement | null = templateContent.querySelector('style') as HTMLElement;
    if (!style) {
      throw new Error('Missing styles');
    }
    style.textContent += `
      .modal-window__title_theme_${ModalWindowTypes.Error} {
        background-color: #f00;
        color: #fff;
      }
      .modal-window__title_theme_${ModalWindowTypes.Info} {
        background-color: #00f;
        color: #fff;
      }
      .modal-window__title_theme_${ModalWindowTypes.Warning} {
        background-color: #e0cf34;
        color: #333;
      }
      `;
    const background: HTMLElement | null = templateContent.querySelector('.modal-window__background');
    if (!background) {
      throw new Error('No background.');
    }
    background.addEventListener('click', this.handleClickCancelBtn);
    const buttonContainer: HTMLElement | null = templateContent.querySelector('.modal-window__buttons');
    if (!buttonContainer) {
      throw new Error('There is no button container.');
    }
    buttonContainer.addEventListener('slotchange', this.handleButtonSlotChange);
    this.shadow.append(templateContent);
  }

  attributeChangedCallback(name: ModalWindowDataAttributes): void {
    if (name === ModalWindowDataAttributes.Type) {
      this.changeTitleStyle(this.windowType);
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

  get windowType(): string | null {
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

  handleButtonSlotChange = (event: Event) => {
    event.stopPropagation();
    const slot: HTMLSlotElement = event.target as HTMLSlotElement;
    const assigned: Node[] = slot.assignedNodes();
    if (assigned.length > 1) {
      throw new Error('There should be one button in the slot.');
    }
    if (!assigned.length) {
      return;
    }
    const btn: HTMLButtonElement = assigned[0] as HTMLButtonElement;
    const btnSlotName: string | null = btn.getAttribute('slot');
    if (btnSlotName === ModalWindowButtonIds.Ok) {
      btn.onclick = this.handleClickOkBtn;
    } else if (btnSlotName === ModalWindowButtonIds.Cancel) {
      btn.onclick = this.handleClickCancelBtn;
    }
    btn.setAttribute('style', 'background-color: yellow;padding: 3px 5px;');
  };

  handleClickOkBtn = (event: Event): void => {
    event.stopPropagation();
    const eventOk: CustomEvent = new CustomEvent(
      this.windowEventOk
    || this.defaultWindowEventOk,
    );
    this.dispatchEvent(eventOk);
  };

  handleClickCancelBtn = (event: Event): void => {
    event.stopPropagation();
    const eventCancel: CustomEvent = new CustomEvent(
      this.windowEventCancel
    || this.defaultWindowEventCancel,
    );
    this.dispatchEvent(eventCancel);
  };

  changeTitleStyle(type: string | null): void {
    const title: HTMLElement | null | undefined = this.shadowRoot?.querySelector('.modal-window__title');
    if (!title) throw new Error('Missing title.');
    if (type === null) {
      title.setAttribute('class', `modal-window__title modal-window__title_theme_${this.defaultWindowType}`);
    } else if (isValueInEnum(type, WindowTypes)) {
      title.setAttribute('class', `modal-window__title modal-window__title_theme_${type}`);
    } else {
      throw new Error('The modal window type is incorrect.');
    }
  }

  toggleOpenState(state: string | null): void {
    const modalWindow: HTMLElement | null | undefined = this.shadowRoot?.querySelector('.modal-window');
    if (!modalWindow) throw new Error('There is no modal window.');
    if (state === null) {
      modalWindow.setAttribute('class', 'modal-window');
    } else if (state === ModalWindowStates.Opened) {
      modalWindow.setAttribute('class', 'modal-window modal-window_opened');
    } else if (state === ModalWindowStates.Closed) {
      modalWindow.setAttribute('class', 'modal-window');
    } else {
      throw new Error('The open state of the modal window is incorrect.');
    }
  }
}

customElements.define('modal-window', ModalWindow);
