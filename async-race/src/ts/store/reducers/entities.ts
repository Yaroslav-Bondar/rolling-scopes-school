import merge from 'lodash/merge';

function entities(state: unknown = { users: {}, posts: {} }, action: UnknownAction) {
  if (action.response?.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

export { entities };
