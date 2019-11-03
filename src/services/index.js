import { ApiService as Api } from './apiService';

import { dispatch } from '../redux/store';
import { signOut as signOutAction, signIn as signInAction } from '../redux/actions';

const signOutCb = () => {
  console.log('signOutCb');
  dispatch(signOutAction());
};

const signInCb = (userData) => {
  console.log('signInCb');
  dispatch(signInAction(userData));
};

const ApiService = new Api({
  apiBase: process.env.API_BASE,
  authCheckTimeout: process.env.AUTH_CHECK_TIMEOUT,
  signOutCb,
  signInCb
});

export { ApiService };
