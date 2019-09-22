import apiService from '../apiService';

import { signIn as signInAction } from '../../redux/actions/accounts';
import { dispatch } from '../../redux/store';

class authService {
  storeTokens = ({ token, refreshToken }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  checkToken = () => {};

  getAccessToken = () => localStorage.getItem('token');

  getRefreshToken = () => localStorage.getItem('refreshToken');

  signIn = async ({ email, password }) => {
    const { storeTokens } = this;
    const apiResponse = await apiService.signIn({ email, password });
    const { error } = apiResponse;

    if (!error) {
      const {
        _id,
        name,
        token,
        refreshToken,
      } = apiResponse.data;

      storeTokens({ token, refreshToken });
      dispatch(signInAction({ _id, name, email }));

      return { _id, email, name, error };
    } else {
      console.log('response error ', error);
      return apiResponse;
    }
  };

  signOut = () => this.removeTokens();
}

export default new authService();
