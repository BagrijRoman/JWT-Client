import axios from 'axios';
import * as R from 'ramda';

import { errors, httpStatus } from '../../const';
import apiEndpoints from './apiEndpoints';

class apiService {
  constructor({ apiBase }) {
    this.api = axios.create({
      baseURL: apiBase,
    });
  }

  handleResponse = (response) => {
    const { data, status } = response;
    const { handleRequestError } = this;

    if (status >= 200 && status < 300) {
      return {
        data,
        error: false,
      };
    } else {
      return handleRequestError(response);
    }
  };

  handleRequestError = (err) =>  {
    const status = R.pathOr(null, ['response', 'status'], err);

    return {
      error: true,
      type: R.pathOr(null, ['response', 'data', 'type'], err),
      details: R.pathOr(null, ['response', 'data', 'details'], err),
      networkError: err.message === errors.NETWORK_ERROR,
      unauthorized: status === httpStatus.UNAUTHORIZED,
    }
  };

  request = async (url, method, bodyOrHeaders, options = {}) => {
    const { handleResponse, handleRequestError } = this;
    try {
      const response = await this.api[method](url, bodyOrHeaders, options);
      return handleResponse(response);
    } catch (err) {
      return handleRequestError(err);
    }
  };

  signIn = async ({ email, password }) => this.request(apiEndpoints.signIn, 'post', { email, password });

  signUp = async ({ name, email, password, rePassword }) =>
    this.request(apiEndpoints.signUp, 'post', { name, email, password, rePassword });

  refreshToken = async (refreshToken) => this.request(
    apiEndpoints.refreshToken,
    'get',
    { headers: { Authorization: refreshToken } }
  );

  resetPasswordRequest = async ({ email }) => this.request(
    apiEndpoints.resetPasswordRequest,
    'post',
    { email }
  );

  resetPassword = async (resetPasswordToken, { password, rePassword }) => this.request(
    apiEndpoints.resetPassword,
    'post',
    { password, rePassword },
    { headers: { Authorization: resetPasswordToken } }
  );
}

const api = new apiService({ apiBase: process.env.API_BASE });

export default api;
