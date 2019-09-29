import { setLocale } from 'react-redux-i18n';

import { en, de, ua } from './localizations';
import localizationKeys from './localizationKeys';

import { dispatch } from '../redux/store';

const localizations = {
  en,
  de,
  ua,
};

const setLocalization = key => dispatch(setLocale(key));

export {
  localizations,
  localizationKeys,
  setLocalization,
};
