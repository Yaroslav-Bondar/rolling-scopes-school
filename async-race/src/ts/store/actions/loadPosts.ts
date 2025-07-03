import { changePageNumber } from './changePageNumber';
import { AppDispatch, AppGetState } from '../index';
import { postsSchema } from '../schemas';
import { CALL_API } from '../../constants';

const SKIP = 10;
const LIMIT = 10;

const fetchPosts = (endpoint: string): ApiAction<CallApi<typeof postsSchema>> => ({
  [CALL_API]: {
    types: [PostsActionTypes.Request, PostsActionTypes.Success, PostsActionTypes.Failure],
    endpoint,
    schema: postsSchema,
  },
});

const loadPosts = (pageNumber: number) => (dispatch: AppDispatch, getState: AppGetState) => {
  const { isNextPage = false, idsByPage = {}, currentPageNumber = 0 } = getState().pagination.posts || {};

  if (idsByPage[pageNumber] !== undefined) {
    return dispatch(changePageNumber(PostsActionTypes.ChangePageNumber, pageNumber));
  }
  if (currentPageNumber > 0 && !isNextPage) {
    return null;
  }

  const skip = (currentPageNumber + 1) * SKIP - SKIP;
  const endpoint = `posts?limit=${LIMIT}&skip=${skip}`;

  return dispatch(fetchPosts(endpoint));
};

export { loadPosts };
