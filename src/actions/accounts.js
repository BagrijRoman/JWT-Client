export const TEST_ACTION = 'TEST::ACTION';
export const SIGN_IN = 'ACCOUNTS::SIGN_IN';
export const SIGN_OUT = 'ACCOUNTS::SIGN_OUT';

export const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const testAction = () => ({
  type: TEST_ACTION,
  payload: null,
});