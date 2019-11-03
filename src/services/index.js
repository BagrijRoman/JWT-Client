import { ApiService as Api } from './apiService';

const signOutCb = () => {
  console.log('signOutCb');
  // redux sign out action call
};

const signInCb = (user) => {
  console.log('signInCb');
  // sign in redux action
};

const ApiService = new Api({
  apiBase: process.env.API_BASE,
  authCheckTimeout: process.env.AUTH_CHECK_TIMEOUT,
  signOutCb,
  signInCb
});

export { ApiService };
