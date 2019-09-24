import apiService from '../apiService';

import {
  signIn as signInAction,
  signOut as signOutAction,
} from '../../redux/actions/accounts';
import { dispatch } from '../../redux/store';

class authService {
  _storeTokens = ({ token, refreshToken }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  _removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  _checkToken = () => {};

  _getAccessToken = () => localStorage.getItem('token');

  _getRefreshToken = () => localStorage.getItem('refreshToken');

  _processSignInData = (data) => {
    const { _storeTokens } = this;
    const {
      _id,
      name,
      email,
      token,
      refreshToken,
    } = data;

    _storeTokens({ token, refreshToken });
    dispatch(signInAction({ _id, name, email }));

    return { _id, email, name };
  };

  signIn = async ({ email, password }) => {
    const { _processSignInData } = this;
    const apiResponse = await apiService.signIn({ email, password });
    const { error, data } = apiResponse;

    if (!error) {
      return _processSignInData(data);
    } else {
      return apiResponse;
    }
  };

  signUp = async (postData) => {
    const { _processSignInData } = this;
    const { name, email, password, rePassword } = postData;
    const apiResponse = await apiService.signUp({ name, email, password, rePassword });
    const { error, data } = apiResponse;

    if (!error) {
      return _processSignInData(data);
    } else {
      return apiResponse;
    }
  };

  signOut = () => {
    this._removeTokens();
    dispatch(signOutAction());
  }
}

export default new authService();
