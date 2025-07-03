import { Component } from './component';
import { setDataAttributes, createElement } from '../services';

declare global {
  interface HTMLElementTagNameMap {
    'x-list': ListComponent;
  }
}

type HandleClick = () => void;

interface UpdatePaginationProps {
  handleNextClick: HandleClick;
  handlePrevClick: HandleClick;
  isNextPage: boolean;
  isPrevPage: boolean;
  currentPageNumber: number;
}

interface UpdateProps extends UpdatePaginationProps {
  renderItem: () => string | Node;
  items: unknown[];
  loadingLabel: string;
  isFatching: boolean;
}

class ListComponent extends Component {
  constructor() {
    super();
    const container = createElement({ classes: ['list'] });
    const listItems = createElement({ classes: ['list__items'] });
    const xPagination = document.createElement('x-pagination');
    container.append(listItems, xPagination);
    this.shadowDom.append(container);
  }

  protected updatePagination(data: UpdatePaginationProps) {
    const { isPrevPage, isNextPage, currentPageNumber, handleNextClick, handlePrevClick } = data;
    const xPagination = this.getElement()('x-pagination');
    setDataAttributes.call(xPagination, {
      [PaginationDataAttributes.PrevBtnActive]: String(isPrevPage),
      [PaginationDataAttributes.PageNumber]: String(currentPageNumber),
      [PaginationDataAttributes.NextBtnActive]: String(isNextPage),
    });
    xPagination.nextClick = handleNextClick;
    xPagination.prevClick = handlePrevClick;
  }

  update(props: UpdateProps) {
    if (!this.isConnected) return;
    const listItems = this.getElement<'div'>()('.list__items');

    const { renderItem, items, loadingLabel, isFatching, isNextPage } = props;

    // It's important to update the pagination first.
    // The buttons of the pagination must be blocked when the data request is going,
    // to avoid mess in the store.
    this.updatePagination(props);

    const isEmpty = items.length === 0;
    if (isEmpty && isFatching) {
      listItems.innerHTML = loadingLabel;
      return;
    }
    if (isEmpty && !isNextPage) {
      listItems.innerHTML = 'Nothing here.';
      return;
    }
    // render data.
    listItems.innerHTML = '';
    listItems.append(...items.map(renderItem));
  }
}

customElements.define('x-list', ListComponent);
