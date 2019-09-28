import jwt from 'jsonwebtoken';

import apiService from '../apiService';
import { notificator } from '../../utils';
import { errors, messages } from '../../const';

import {
  signIn as signInAction,
  signOut as signOutAction,
  setLoading,
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

  _checkToken = (token) => token ? (jwt.decode(token).exp - 5) > (Date.now() / 1000) : false;

  _getAccessToken = () => localStorage.getItem('token');

  _getRefreshToken = () => localStorage.getItem('refreshToken');

  _checkAccessToken = () => {
    const { _getAccessToken, _checkToken } = this;
    return _checkToken(_getAccessToken());
  };

  _checkRefreshToken = () => {
    const { _getRefreshToken, _checkToken } = this;
    return _checkToken(_getRefreshToken());
  };

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

  checkAuth = async () => {
    const {
      _checkRefreshToken,
      _getRefreshToken,
      _processSignInData,
      signOut,
    } = this;

    const isRefreshTokenValid = _checkRefreshToken();

    if (isRefreshTokenValid) {
      const { error, data, networkError, unauthorized } = await apiService.refreshToken(_getRefreshToken());

      if (!error) {
        _processSignInData(data);
      }

      if (networkError) {
        const checkAuthTimeout = process.env.AUTH_CHECK_TIMEOUT;
        notificator.error(errors.CHECK_AUTH_NETWORK_ERROR);  // todo translate message
        notificator.info(`${messages.AUTH_RECHECK_IN} ${checkAuthTimeout/1000} sec`);
        setTimeout(this.checkAuth, checkAuthTimeout);
        return;
      }

      if (unauthorized) {
        return signOut();
      }

      return dispatch(setLoading(false));
    }

    signOut();
  };

  signIn = async ({ email, password }) => {
    const { _processSignInData } = this;
    const apiResponse = await apiService.signIn({ email, password });
    const { error, data } = apiResponse;

    if (!error) {
      return _processSignInData(data);
    }

    return apiResponse;
  };

  signUp = async (postData) => {
    const { _processSignInData } = this;
    const { name, email, password, rePassword } = postData;
    const apiResponse = await apiService.signUp({ name, email, password, rePassword });
    const { error, data } = apiResponse;

    if (!error) {
      return _processSignInData(data);
    }

    return apiResponse;
  };

  signOut = () => {
    this._removeTokens();
    dispatch(signOutAction());
    dispatch(setLoading(false));
  }
}

export default new authService();
