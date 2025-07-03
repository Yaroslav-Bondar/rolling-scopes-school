import { changePageNumber } from './changePageNumber';
import { AppDispatch, AppGetState } from '../index';
import { postsSchema } from '../schemas';
import { CALL_API } from '../../constants';

const SKIP = 10;
const LIMIT = 10;

const fetchPostsByUser = (endpoint: string, userId: string): ApiAction<CallApi<typeof postsSchema>> => ({
  userId,
  [CALL_API]: {
    types: [PostsByUserActionTypes.Request, PostsByUserActionTypes.Success, PostsByUserActionTypes.Failure],
    endpoint,
    schema: postsSchema,
  },
});

const loadPostsByUser =
  (pageNumber: number, userId: string) => (dispatch: AppDispatch, getState: AppGetState) => {
    const {
      isNextPage = false,
      idsByPage = {},
      currentPageNumber = 0,
    } = getState().pagination.postsByUser[userId] || {};

    if (idsByPage[pageNumber] !== undefined) {
      return dispatch(changePageNumber(PostsByUserActionTypes.ChangePageNumber, pageNumber, { userId }));
    }
    if (currentPageNumber > 0 && !isNextPage) {
      return null;
    }

    const skip = pageNumber * SKIP - SKIP;
    const endpoint = `users/${userId}/posts?limit=${LIMIT}&skip=${skip}`;

    return dispatch(fetchPostsByUser(endpoint, userId));
  };

export { loadPostsByUser };
