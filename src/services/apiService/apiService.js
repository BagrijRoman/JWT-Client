import axios from 'axios';

class apiService {
  constructor({ apiBase }) {
    this.api = axios.create({
      baseURL: apiBase,
    });
  }

  handleResponse = (response) => {

    console.log('response ', response);

    debugger


  };

  handleError = () => {

  };

  post = async (url, config) => {
    const { handleResponse, handleError } = this;
    const response = await this.api.post(url, config);
    const { status } = response;

    if (status >= 200 && status < 300) {
      return handleResponse(response);
    } else {
      return handleError(response);
    }
  };

  signIn = async ({ email, password }) => this.post('/auth/sign-in', { email, password });
}

const api = new apiService({ apiBase: process.env.API_BASE });

export default api;
