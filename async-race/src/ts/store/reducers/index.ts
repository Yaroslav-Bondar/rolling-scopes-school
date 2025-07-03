import { combineReducers } from 'redux';
import { paginate } from './paginate';
import { entities } from './entities';
import { errorMessage } from './errorMessage';

const pagination = combineReducers({
  users: paginate({
    // The key to picking up the IDs from the normalized response.
    idsKey: 'users',
    types: [
      UsersActionTypes.ChangePageNumber,
      UsersActionTypes.Request,
      UsersActionTypes.Success,
      UsersActionTypes.Failure,
    ],
  }),
  posts: paginate({
    idsKey: 'posts',
    types: [
      PostsActionTypes.ChangePageNumber,
      PostsActionTypes.Request,
      PostsActionTypes.Success,
      PostsActionTypes.Failure,
    ],
  }),
  postsByUser: paginate({
    // To get the key to save data.
    mapActionToKey: (action) => action.userId,
    idsKey: 'posts',
    types: [
      PostsByUserActionTypes.ChangePageNumber,
      PostsByUserActionTypes.Request,
      PostsByUserActionTypes.Success,
      PostsByUserActionTypes.Failure,
    ],
  }),
});

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
});

export { rootReducer };
