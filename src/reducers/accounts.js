import { TEST_ACTION } from '../actions/accounts';

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

    default:
      return { ...state };
  }
};
