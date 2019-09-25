import axios from 'axios';

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

  handleRequestError = (err) => {
    const { status, data: { type, details } } = err.response;

    // todo add status parsing here

    return {
      error: true,
      type,
      details,
    }
  };

  request = async (url, method, body, options = {}) => {
    const { handleResponse, handleRequestError } = this;
    try {
      const response = await this.api[method](url, body, options);
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
}

const api = new apiService({ apiBase: process.env.API_BASE });

export default api;
