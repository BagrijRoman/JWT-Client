import { TEST_ACTION, SIGN_IN } from '../actions/accounts';

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

    // todo add sign out action handler here

    default:
      return { ...state };
  }
};
