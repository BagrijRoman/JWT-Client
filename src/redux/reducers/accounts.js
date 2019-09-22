import { TEST_ACTION, SIGN_IN, SIGN_OUT } from '../actions/accounts';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TEST_ACTION:
      return {
        ...state,
        testActionExequted: true,
      };

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
