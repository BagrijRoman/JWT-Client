import axios from 'axios';

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

    return {
      error: true,
      type,
      details,
    }
  };

  request = async (url, method, body) => {
    const { handleResponse, handleRequestError } = this;
    try {
      const response = await this.api[method](url, body);
      return handleResponse(response);
    } catch (err) {
      return handleRequestError(err);
    }
  };

  signIn = async ({ email, password }) => this.request('/auth/sign-in', 'post', { email, password });
}

const api = new apiService({ apiBase: process.env.API_BASE });

export default api;
