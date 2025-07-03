import { CALL_API } from '../constants';
import { callApi } from './callApi';
import type { AppDispatch } from '../store';
import type { Schema } from '../store/schemas';

export const api =
  () =>
  (next: AppDispatch) =>
  async (action: any): Promise<Record<string, any>> => {
    const callAPI: CallApi<Schema> = action[CALL_API];
    if (callAPI === undefined) {
      return next(action);
    }
    const { types, schema, endpoint } = callAPI;
    const actionWith = <T extends Record<string, any>>(data: T) => {
      const finalAction: T = { ...data, ...action };
      delete finalAction[CALL_API];
      return finalAction;
    };

    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }));

    try {
      const response = await callApi(endpoint, schema);
      // The returned result will be the result of store.dispatch function execution.
      return next(
        actionWith({
          type: successType,
          response,
        }),
      );
    } catch (error: unknown) {
      return next({
        type: failureType,
        error: error || new Error('Something went wrong.'),
      });
    }
  };
