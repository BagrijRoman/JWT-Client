import { TEST_ACTION } from '../actions/accounts';

const initialState = {};

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
