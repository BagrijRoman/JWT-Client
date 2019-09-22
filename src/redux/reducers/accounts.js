import {
  SIGN_IN,
  SIGN_OUT,
} from '../actionTypes/accounts';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
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

    default:
      return { ...state };
  }
};
