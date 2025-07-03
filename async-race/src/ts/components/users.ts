import { Component } from './component';
import { createElement } from '../services';
import { loadUsers } from '../store/actions';
import { store } from '../store';

class UsersComponent extends Component {
  private readonly START_PAGE_NUMBER = 1;

  private unsubscribeFromStore: Function | undefined = undefined;

  constructor() {
    super();
    const container = createElement({ classes: ['users'] });
    const XList = createElement({ tag: 'x-list' });
    container.append(XList);
    this.shadowDom.append(container);
  }

  protected static handleNextClick() {
    const { currentPageNumber } = store.getState().pagination.users;
    store.dispatch(loadUsers(currentPageNumber + 1));
  }

  protected static handlePrevClick() {
    const { currentPageNumber } = store.getState().pagination.users;
    store.dispatch(loadUsers(currentPageNumber - 1));
  }

  static renderUser(data: Record<string, unknown>) {
    const xUser = createElement({ tag: 'x-user' });
    xUser.update(data);
    return xUser;
  }

  protected subscribeToStore = () => {
    const pagination = store.getState().pagination.users;
    const usersIds = pagination.idsByPage[pagination.currentPageNumber] || [];
    const users = usersIds.map((id: number) => store.getState().entities.users[id]);
    this.getElement()('x-list').update({
      renderItem: UsersComponent.renderUser,
      items: users,
      handleNextClick: UsersComponent.handleNextClick,
      handlePrevClick: UsersComponent.handlePrevClick,
      ...pagination,
      loadingLabel: 'Loading users...',
    });
  };

  connectedCallback() {
    this.unsubscribeFromStore = store.subscribe(this.subscribeToStore);
    store.dispatch(loadUsers(this.START_PAGE_NUMBER));
  }

  disconnectedCallback() {
    this.unsubscribeFromStore?.();
  }
}

customElements.define('x-users', UsersComponent);
