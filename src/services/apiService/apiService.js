import axios from 'axios';

class apiService {
  constructor({ apiBase }) {
    this.api = axios.create({
      baseURL: apiBase,
    });
  }

  handleResponse = (response) => {
    const { data, status } = response;
    const { handleError } = this;

    if (status >= 200 && status < 300) {
      return {
        data,
        error: false,
      };
    } else {
      return handleErrorResponse(response);
    }
  };

  handleErrorResponse = () => {

  };

  handleRequestError = () => {

  };

  // post = async (url, config) => {
  //   const { handleResponse } = this;
  //
  // };

  request = async (url, method, body) => {
    try {
      const response = await this.api[method](url, body);
      return this.handleResponse(response);
    } catch (err) {
      console.log('request error ', err);
      return { error: true };
    }
  };

  signIn = async ({ email, password }) => this.request('/auth/sign-in', 'post', { email, password });
}

const api = new apiService({ apiBase: process.env.API_BASE });

export default api;
