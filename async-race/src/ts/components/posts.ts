import { Component } from './component';
import { createElement } from '../services';
import { loadPosts } from '../store/actions';
import { store } from '../store';

class PostsComponent extends Component {
  private readonly START_PAGE_NUMBER = 1;

  private unsubscribeFromStore: Function | undefined = undefined;

  constructor() {
    super();
    const container = createElement({ classes: ['posts'] });
    const XList = createElement({ tag: 'x-list' });
    container.append(XList);
    this.shadowDom.append(container);
  }

  protected static handleNextClick() {
    const { currentPageNumber } = store.getState().pagination.posts;
    store.dispatch(loadPosts(currentPageNumber + 1));
  }

  protected static handlePrevClick() {
    const { currentPageNumber } = store.getState().pagination.posts;
    store.dispatch(loadPosts(currentPageNumber - 1));
  }

  static renderPost(data: Record<string, unknown>) {
    const xPost = createElement({ tag: 'x-post' });
    xPost.update(data);
    return xPost;
  }

  protected subscribeToPosts = () => {
    const pagination = store.getState().pagination.posts;
    const postsIds = pagination.idsByPage[pagination.currentPageNumber] || [];
    const posts = postsIds.map((id: number) => store.getState().entities.posts[id]);
    this.getElement()('x-list').update({
      renderItem: PostsComponent.renderPost,
      items: posts,
      handleNextClick: PostsComponent.handleNextClick,
      handlePrevClick: PostsComponent.handlePrevClick,
      ...pagination,
      loadingLabel: 'Loading posts...',
    });
  };

  connectedCallback() {
    this.unsubscribeFromStore = store.subscribe(this.subscribeToPosts);
    store.dispatch(loadPosts(this.START_PAGE_NUMBER));
  }

  disconnectedCallback() {
    this.unsubscribeFromStore?.();
  }
}

customElements.define('x-posts', PostsComponent);
