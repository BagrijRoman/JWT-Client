import {
  SIGN_IN,
  SIGN_OUT,
  SET_LOADING,
} from './actionTypes';

export const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
});

export const signOut = () => ({
  type: SIGN_OUT
});

export const setLoading = (loadingValue) => ({
  type: SET_LOADING,
  payload: loadingValue,
});
