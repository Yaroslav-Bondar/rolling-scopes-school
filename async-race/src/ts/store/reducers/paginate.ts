interface PaginationData {
  readonly types: readonly [string, string, string, string];
  readonly mapActionToKey?: (action: UnknownAction) => string;
  readonly idsKey: string;
}

interface PaginationState {
  total: number;
  currentPageNumber: number;
  idsByPage: Record<number, number[]>;
  isNextPage: boolean;
  isPrevPage: boolean;
  isFatching: boolean;
}

interface PaginationByKeyState<State> {
  [Key: string]: State;
}

function paginate({ types, mapActionToKey, idsKey }: PaginationData) {
  const MIN_PAGE: 1 = 1;
  const [changePageNumberType, requestType, successType, failureType] = types;

  function updatePaginate(
    state: PaginationState = {
      total: 0,
      currentPageNumber: 0,
      idsByPage: {},
      isNextPage: false,
      isPrevPage: false,
      isFatching: false,
    },
    action: UnknownAction,
  ) {
    const { type } = action;
    if (type === changePageNumberType) {
      const selectSumLoaded = (idsByPage: typeof state.idsByPage, pageNumber: number): number => {
        const keys = Object.keys(idsByPage);
        const indexes = keys.filter((key) => Number(key) <= pageNumber);
        const sum = indexes.reduce((accum, value) => accum + idsByPage[Number(value)].length, 0);
        return sum;
      };
      return {
        ...state,
        currentPageNumber: action.pageNumber,
        isPrevPage: action.pageNumber > MIN_PAGE,
        isNextPage: state.total > selectSumLoaded(state.idsByPage, action.pageNumber),
      };
    }
    if (type === requestType) {
      let { currentPageNumber } = state;
      currentPageNumber += 1;
      return {
        ...state,
        isFatching: true,
        isNextPage: false,
        isPrevPage: false,
        currentPageNumber,
      };
    }
    if (type === successType) {
      return {
        ...state,
        idsByPage: {
          ...state.idsByPage,
          [state.currentPageNumber]: action.response.result[idsKey],
        },
        total: action.response.result.total,
        isNextPage: action.response.isNextPage,
        isPrevPage: state.currentPageNumber > 1,
        isFatching: false,
      };
    }
    if (type === failureType) {
      return {
        ...state,
        isFatching: false,
      };
    }
    return state;
  }

  if (!mapActionToKey) return updatePaginate;

  return (state: PaginationByKeyState<PaginationState> = {}, action: UnknownAction) => {
    const { type } = action;
    if (
      type === changePageNumberType ||
      type === requestType ||
      type === successType ||
      type === failureType
    ) {
      const key: string = mapActionToKey(action);
      return {
        ...state,
        [key]: updatePaginate(state[key], action),
      };
    }
    return state;
  };
}

export { paginate };
