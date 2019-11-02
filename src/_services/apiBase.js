import axios from 'axios';
import { TokenService } from './tokenService';

class ApiBase extends TokenService {
  constructor (config) {
    super(config);
    const { signOutCb, API_BASE } = config;
    this.signOutCb = signOutCb;
    this.api = axios.create({ baseURL: API_BASE });
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

  async refreshToken() {
    const { status, data, error, unauthorized } = await this.request({
      method: 'get',
      url: apiEndpoints.refreshToken,
      options: {
        headers: { Authorization: this.getRefreshToken() }
      },
    });
    const isOperationSuccess = !error && !unauthorized;

    if (!isOperationSuccess) {
      this.signOut();
    } else {

    }

    return isOperationSuccess;
  }

  async checkTokenOnStartup() {

  }

  async signIn({ email, password }) {
    // const { token, refreshToken } = userData;
    // this.storeTokens({ token, refreshToken });
  }

  async signUp(formData) {


    // this.storeTokens({ token, refreshToken });
  }

  signOut() {
    this.removeTokens();
    this.signOutCb();
  }
}

export { ApiBase };
