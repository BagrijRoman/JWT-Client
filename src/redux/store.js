import thunk from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import {
  i18nReducer,
  syncTranslationWithStore,
  loadTranslations,
  setLocale
} from 'react-redux-i18n';

import { accountsReducer } from './reducers';
import { translations, defaultTranslation } from '../i18n';

const initialState = {};
const middleWare = [applyMiddleware(thunk)];
const appReducer = combineReducers({
  i18n: i18nReducer,
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

const { dispatch } = store;

syncTranslationWithStore(store);
dispatch(loadTranslations(translations));
dispatch(setLocale(defaultTranslation));

export default store;

export {
  dispatch,
};
