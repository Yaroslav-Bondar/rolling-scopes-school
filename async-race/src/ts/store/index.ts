import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { api } from '../middleware';
import { rootReducer } from './reducers';

const store: Record<string, any> = createStore(rootReducer, applyMiddleware(thunk, api));

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
export type AppStore = typeof store;
export { store };
