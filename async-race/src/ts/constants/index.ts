export const CALL_API = 'callApi';
export enum Routes {
  Index = '/',
  Posts = '/posts',
  PostsSearch = '/posts/query/:query',
  PostsByUser = '/users/:userid/posts',
  Post = '/post/:post',
  Users = '/users',
  UsersSearch = '/users/query/:query',
  User = '/user/:userid',
  Error = '/error/:code',
}
