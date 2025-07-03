const enum SearchTypes {
  Post = 'post',
  User = 'user',
}

type Page = (props: Record<string, string | number>) => string;

const enum NavLinkDataAttributes {
  Selected = 'data-link-selected',
  Text = 'data-link-text',
}

const enum ModalWindowDataAttributes {
  Type = 'data-window-type',
  Opened = 'data-window-opened',
  EventOk = 'data-window-event-ok',
  EventCancel = 'data-window-event-cancel',
}

const enum ModalWindowTypes {
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

const enum ModalWindowStates {
  Opened = 'true',
  Closed = 'false',
}

const enum ModalWindowEvents {
  Ok = 'ok',
  Cancel = 'cancel',
  FindKittens = 'find-kittens',
}

const enum SetAttributesMode {
  Write = 'write',
  Overwrite = 'overwrite',
}

const enum PaginationDataAttributes {
  NextBtnActive = 'data-next-btn',
  PrevBtnActive = 'data-prev-btn',
  NextEvent = 'data-next-event',
  PrevEvent = 'data-prev-event',
  PageNumber = 'data-page-number',
}

const enum PaginationEvents {
  Next = 'next',
  Prev = 'prev',
}

const enum UserDataAttributes {
  Id = 'data-user-id',
}

const enum PostsDataAttributes {
  UserId = 'data-user-id',
}

const enum PostsByUserDataAttributes {
  UserId = 'data-user-id',
}

const enum PostDataAttributes {
  Id = 'data-post-id',
}

interface Action<T extends string = string> {
  type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent types that extend `Action` from
 * having an index signature.
 */
interface UnknownAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

const enum UsersActionTypes {
  ChangePageNumber = 'CHANGE_PAGE_NUMBER_USERS',
  Request = 'USERS_REQUEST',
  Success = 'USERS_SUCCESS',
  Failure = 'USERS_FAILURE',
}

const enum PostsActionTypes {
  ChangePageNumber = 'CHANGE_PAGE_NUMBER_POSTS',
  Request = 'POSTS_REQUEST',
  Success = 'POSTS_SUCCESS',
  Failure = 'POSTS_FAILURE',
}

const enum PostsByUserActionTypes {
  ChangePageNumber = 'CHANGE_PAGE_NUMBER_POSTS_BY_USER',
  Request = 'POSTS_BY_USER_REQUEST',
  Success = 'POSTS_BY_USER_SUCCESS',
  Failure = 'POSTS_BY_USER_FAILURE',
}

type CallApi<Schema> =
  | {
      readonly types: readonly [string, string, string];
      readonly schema: Schema;
      readonly endpoint: string;
    }
  | undefined;

interface ApiAction<CallApi> {
  callApi: CallApi;
  [extraProps: string]: any;
}
