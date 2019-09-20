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
      return handleError(response);
    }
  };

  handleError = () => {

  };

  post = async (url, config) => {
    const { handleResponse } = this;
    const response = await this.api.post(url, config);
    return handleResponse(response);
  };

  signIn = async ({ email, password }) => this.post('/auth/sign-in', { email, password });
}

const api = new apiService({ apiBase: process.env.API_BASE });

export default api;
