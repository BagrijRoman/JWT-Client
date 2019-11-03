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

import { localizations, localizationKeys } from '../i18n';
import { accountsReducer } from './accounts/reducer';

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
dispatch(loadTranslations(localizations));
dispatch(setLocale(localizationKeys.DEFAULT));

export default store;

export {
  dispatch,
};
