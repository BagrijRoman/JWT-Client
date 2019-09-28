import { setLocale } from 'react-redux-i18n';

import { en, de } from './localizations';
import localizationKeys from './localizationKeys';

import { dispatch } from '../redux/store';

const localizations = {
  en,
  de,
};

const setLocalization = key => dispatch(setLocale(key));

export {
  localizations,
  localizationKeys,
  setLocalization,
};
