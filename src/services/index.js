import { ApiService as Api } from './apiService';

const { API_BASE } = process.env;

const signOutCb = () => {
  // redux sign out action call
};

const signInCb = (user) => {
  // sign in redux action
};

const ApiService = new Api({
  API_BASE,
  signOutCb,
});

export { ApiService };
