import axios from 'axios';
import * as R from 'ramda';

import { TokenService } from './tokenService';
import { apiEndpoints, httpStatus } from '../const';

class ApiBase extends TokenService {
  constructor (config) {
    super(config);
    const {
      signInCb,
      signOutCb,
      apiBase,
      authCheckTimeout,
    } = config;
    this.signOutCb = signOutCb;
    this.signInCb = signInCb;
    this.authCheckTimeout = authCheckTimeout;
    this.api = axios.create({ baseURL: apiBase });
  }

  async request({ url, method, body = {}, options = {} }) {
    return this.api[method](url, method === 'get' ? options : body, options);
  }

  static handleErrorResponse(err) {
    return {
      error: true,
      msgKey: R.pathOr(null, ['response', 'data', 'msgKey'], err),
      type: R.pathOr(null, ['response', 'data', 'type'], err),
      data: R.pathOr(null, ['response', 'data', 'data'], err),
      details: R.pathOr(null, ['response', 'data', 'details'], err),
      networkError: err.message === errors.NETWORK_ERROR,
      unauthorized: status === httpStatus.UNAUTHORIZED,
    }
  }

  async requestWithAuth({ url, method, body = {}, options = {} }) {
    try {
      return this.request({ url, method, body, options });
    } catch (err) {
      return this.handleErrorResponse(err);
    }
  }

  async refreshTokens() {
    return this.request({
      method: 'get',
      url: apiEndpoints.refreshToken,
      options: {
        headers: { Authorization: this.getRefreshToken() }
      },
    });
  }

  async checkAuthOnStartup() {
    const isRefreshTokenValid = this.checkRefreshToken();

    if (isRefreshTokenValid) {
      const { data, unauthorized, networkError } = await this.refreshTokens();

      if (networkError) {
        return setTimeout(this.checkAuthOnStartup, this.authCheckTimeout);
      } else if (unauthorized) {
        return this.signOut();
      }

      return this.processSignInData(data);
    } else {
      this.signOut();
    }
  }

  processSignInData(data) {
    const { token, refreshToken } = data;
    this.storeTokens({ token, refreshToken });
    this.signInCb(data);
  }

  async signIn({ email, password }) {
    try {
      const { data } = await this.request({
        method: 'post',
        url: apiEndpoints.signIn,
        body: { email, password },
      });
      this.processSignInData(data);

      return { success: true };
    } catch (err) {
      return {
        error: true,
        status: R.pathOr(null, ['response', 'status'], err),
        dataKey: R.pathOr(null, ['response', 'data', 'data', 'key'], err),
        msgKey: R.pathOr(null, ['response', 'data', 'msgKey'], err),
      };
    }
  }

  async signUp(formData) {

    // this.storeTokens({ token, refreshToken });
    // processSignInData

  }

  signOut() {
    this.removeTokens();
    this.signOutCb();
  }
}

export { ApiBase };
