import {
  SIGN_IN,
  SIGN_OUT,
  SET_LOADING,
} from './actionTypes';

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: {},
};

export const accountsReducer =  (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };

    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return { ...state };
  }
};
