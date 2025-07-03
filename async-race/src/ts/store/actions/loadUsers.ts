import { changePageNumber } from './changePageNumber';
import { AppDispatch, AppGetState } from '../index';
import { usersSchema } from '../schemas';
import { CALL_API } from '../../constants';

const SKIP = 10;
const LIMIT = 10;

const fetchUsers = (endpoint: string): ApiAction<CallApi<typeof usersSchema>> => ({
  [CALL_API]: {
    types: [UsersActionTypes.Request, UsersActionTypes.Success, UsersActionTypes.Failure],
    endpoint,
    schema: usersSchema,
  },
});

const loadUsers = (pageNumber: number) => (dispatch: AppDispatch, getState: AppGetState) => {
  const { isNextPage = false, idsByPage = {}, currentPageNumber = 0 } = getState().pagination.users || {};

  if (idsByPage[pageNumber] !== undefined) {
    return dispatch(changePageNumber(UsersActionTypes.ChangePageNumber, pageNumber));
  }
  if (currentPageNumber > 0 && !isNextPage) {
    return null;
  }

  const skip = (currentPageNumber + 1) * SKIP - SKIP;
  const endpoint = `users?limit=${LIMIT}&skip=${skip}`;

  return dispatch(fetchUsers(endpoint));
};

export { loadUsers };
