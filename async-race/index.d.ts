declare const enum Routes {
  Main = '/',
  Users = '/users',
  Posts = '/posts',
  Error = '/error',
}

declare const enum SearchTypes {
  Post = 'post',
  User = 'user',
}

declare const enum ErrorTypes {
  Error_404 = '404',
}

declare const enum NavLinkDataAttributes {
  Selected = 'data-link-selected',
  Text = 'data-link-text',
}

declare const enum ModalWindowDataAttributes {
  Type = 'data-window-type',
  Opened = 'data-window-opened',
  EventOk = 'data-window-event-ok',
  EventCancel = 'data-window-event-cancel',
}

declare const enum ModalWindowTypes {
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

declare const enum ModalWindowStates {
  Opened = 'true',
  Closed = 'false',
}

declare const enum ModalWindowEvents {
  Ok = 'ok',
  Cancel = 'cancel',
  FindKittens = 'find-kittens',
}

declare const enum SetAttributesMode {
  Write = 'write',
  Overwrite = 'overwrite',
}
