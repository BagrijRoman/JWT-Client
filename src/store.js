import thunk from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
} from 'redux';
import { createLogger } from 'redux-logger';

import { accountsReducer } from './reducers';

const initialState = {};
const middleWare = [applyMiddleware(thunk)];
const appReducer = combineReducers({
  accounts: accountsReducer,
});

if (process.env.ENV === 'development') {
  middleWare.push(applyMiddleware(createLogger()));
}

const store = createStore(
  appReducer,
  initialState,
  compose(...middleWare),
);

export default store;