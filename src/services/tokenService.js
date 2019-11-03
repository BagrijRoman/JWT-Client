import jwt from 'jsonwebtoken';
import * as R from 'ramda';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../const';

class TokenService {
  storeTokens = ({ token, refreshToken }) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  removeTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };

  _checkToken = (token) => token ? (jwt.decode(token).exp - 5) > (Date.now() / 1000) : false;

  getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

  getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

  checkAccessToken = () => R.compose(
    this._checkToken,
    this.getAccessToken,
  )();

  checkRefreshToken = () => R.compose(
    this._checkToken,
    this.getRefreshToken,
  )();
}

export { TokenService };
