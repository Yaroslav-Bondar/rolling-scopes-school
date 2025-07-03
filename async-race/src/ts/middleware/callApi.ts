import { normalize } from 'normalizr';
import type { Schema } from '../store/schemas';

const API_ROOT = 'https://dummyjson.com/';

export const callApi = async (endpoint: string, schema: Schema) => {
  const url = API_ROOT + endpoint;
  const response = await fetch(url);
  if (!response.ok) {
    throw await response.json();
  }
  const data = await response.json();
  const { limit, skip, total } = data;
  const isNextPage = limit + skip < total;
  delete data.limit;
  delete data.skip;
  const result = {
    isNextPage,
    ...normalize(data, schema),
  };
  return result;
};
