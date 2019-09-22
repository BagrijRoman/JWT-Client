import { authService } from '../../services';

export const TEST_ACTION = 'TEST::ACTION';
export const SIGN_IN = 'ACCOUNTS::SIGN_IN';
export const SIGN_OUT = 'ACCOUNTS::SIGN_OUT';

export const signIn = (user) => ({
  type: SIGN_IN,
  payload: user,
});

export const signOut = () => (dispatch) => {
  authService.signOut();

  return dispatch({ type: SIGN_OUT });
};
