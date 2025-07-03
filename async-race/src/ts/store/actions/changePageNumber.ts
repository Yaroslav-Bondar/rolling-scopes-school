type Key = Record<string, string>;

export const changePageNumber = (type: string, pageNumber: number, key?: Key): UnknownAction => ({
  type,
  pageNumber,
  ...(key || {}),
});
