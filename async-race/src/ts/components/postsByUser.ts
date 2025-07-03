import { Component } from './component';
import { createElement } from '../services';
import { loadPostsByUser } from '../store/actions';
import { store } from '../store';

class PostsByUserComponent extends Component {
  private readonly START_PAGE_NUMBER = 1;

  private unsubscribeFromStore: Function | undefined = undefined;

  constructor() {
    super();
    const container = createElement({ classes: ['posts'] });
    const XList = createElement({ tag: 'x-list' });
    container.append(XList);
    this.shadowDom.append(container);
  }

  static renderPost(data: Record<string, unknown>) {
    const xPost = createElement({ tag: 'x-post' });
    xPost.update(data);
    return xPost;
  }

  protected subscribeToPosts = () => {
    const pagination = store.getState().pagination.postsByUser[this.userId];
    const postsIds = pagination.idsByPage[pagination.currentPageNumber] || [];
    const posts = postsIds.map((id: number) => store.getState().entities.posts[id]);
    this.getElement()('x-list').update({
      renderItem: PostsByUserComponent.renderPost,
      items: posts,
      handleNextClick: this.handleNextClick,
      handlePrevClick: this.handlePrevClick,
      ...pagination,
      loadingLabel: `Loading user posts. User ID - ${this.userId}`,
    });
  };

  protected handleNextClick() {
    const { currentPageNumber } = store.getState().pagination.postsByUser[this.userId];
    store.dispatch(loadPostsByUser(currentPageNumber + 1, this.userId));
  }

  protected handlePrevClick() {
    const { currentPageNumber } = store.getState().pagination.postsByUser[this.userId];
    store.dispatch(loadPostsByUser(currentPageNumber - 1, this.userId));
  }

  connectedCallback() {
    this.unsubscribeFromStore = store.subscribe(this.subscribeToPosts);
    store.dispatch(loadPostsByUser(this.START_PAGE_NUMBER, this.userId));
  }

  disconnectedCallback() {
    this.unsubscribeFromStore?.();
  }

  get userId() {
    const id = this.getAttribute(PostsByUserDataAttributes.UserId);
    if (id === null) throw new Error('No user ID.');
    if (Number.isNaN(Number(id))) throw new Error('User ID must be a type of number.');
    return id;
  }
}

customElements.define('x-posts-by-user', PostsByUserComponent);
